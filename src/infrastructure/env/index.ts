import { z } from 'zod'
import { loadKeyVaultSecrets } from './keyVault'

const keyVaultName = (environment: string) =>
  z
    .union([
      z.literal('development').transform(() => 'EDS-CCP-BE-Dev'),
      z.literal('staging').transform(() => 'EDS-CCP-BE-Stg'),
      z.literal('production').transform(() => 'EDS-CCP-BE-Prod'),
    ])
    .parse(environment)

const keyVaultSchema = z.object({
  DB_NAME: z.string(),
  DB_HOST: z.string(),
  DB_PWD: z.string(),
  DB_PORT: z.preprocess(Number, z.number()),
  DB_USER: z.string(),
})

const processEnvSchema = z.object({
  APPSERVER_PORT: z.preprocess(Number, z.number()),
  SSL_CERT: z.string().optional(),
})

const envSchema = keyVaultSchema.merge(processEnvSchema)

export type Env = z.infer<typeof envSchema>

export const loadEnv = async (): Promise<Env> => {
  if (process.env['NODE_ENV'] === 'local') {
    // When `NODE_ENV` is `local`, `process.env` will be used instead of Key Vault.
    console.log('Using `process.env` as environment variables.')
    return envSchema.parse({
      DB_NAME: process.env['DB_NAME'],
      DB_HOST: process.env['DB_HOST'],
      DB_PWD: process.env['DB_PWD'],
      DB_PORT: process.env['DB_PORT'],
      DB_USER: process.env['DB_USER'],
      APPSERVER_PORT: process.env['APPSERVER_PORT'],
      SSL_CERT: process.env['SSL_CERT'],
    })
  }
  // When `NODE_ENV` is `development` or `staging` or `production`, Key Vault will be used.
  console.log('Using Azure Key Vault and `process.env` as environment variables.')
  const selectedKeyVaultName = keyVaultName(String(process.env['NODE_ENV']))
  return {
    ...keyVaultSchema.parse(
      await loadKeyVaultSecrets<Env>(selectedKeyVaultName, [
        { output: 'DB_NAME', secretName: 'DB-NAME' },
        { output: 'DB_HOST', secretName: 'DB-HOST' },
        { output: 'DB_PWD', secretName: 'MYSQL-JERAUSER-EDS-CCP-BE-PASSWORD' },
        { output: 'DB_PORT', secretName: 'DB-PORT' },
        { output: 'DB_USER', secretName: 'MYSQL-USERNAME' },
      ])
    ),
    ...processEnvSchema.parse({
      APPSERVER_PORT: process.env['APPSERVER_PORT'],
      SSL_CERT: process.env['SSL_CERT'],
    }),
  }
}
