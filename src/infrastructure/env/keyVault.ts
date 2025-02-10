import { DefaultAzureCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'

const createSecretClient = (keyVaultName: string): SecretClient => {
  const credential = new DefaultAzureCredential()
  const url = `https://${keyVaultName}.vault.azure.net`
  return new SecretClient(url, credential)
}

export type RawSecrets<T> = Record<keyof T, string | undefined>

export const loadKeyVaultSecrets = async <T>(
  keyVaultName: string,
  args: { output: keyof T; secretName: string; version?: string }[]
): Promise<RawSecrets<T>> => {
  const client = createSecretClient(keyVaultName)
  const fetchSecrets = args.map<Promise<[keyof T, string | undefined]>>(
    ({ output, secretName, version }) =>
      client
        .getSecret(secretName, version ? { version } : {})
        .then(({ value }) => [output, value])
  )
  const secrets = await Promise.all(fetchSecrets)
  const initialState = {} as RawSecrets<T>

  return secrets.reduce(
    (state, [output, value]) => ({ ...state, [output]: value }),
    initialState
  )
}
