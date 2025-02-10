import type { Env } from '../../../env'
import type { ConnectionOptions } from 'typeorm'

// To know why {.ts,.js} is needed please refer:
// https://stackoverflow.com/a/57140038

export const ormConfig = (env: Env): ConnectionOptions => ({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PWD,
  database: env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ['src/infrastructure/orm/typeorm/entities/**/*{.ts,.js}'],
  migrations: ['migrations/**/*{.ts,.js}'],
  subscribers: ['src/infrastructure/orm/typeorm/subscribers/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/infrastructure/orm/typeorm/entities',
    migrationsDir: 'migrations',
    subscribersDir: 'src/infrastructure/orm/typeorm/subscribers',
  },
  ssl:
    env.SSL_CERT === undefined
      ? { rejectUnauthorized: false }
      : { cert: Buffer.from(env.SSL_CERT, 'base64') },
})

// This is needed for typeorm's migration script.
export default ormConfig
