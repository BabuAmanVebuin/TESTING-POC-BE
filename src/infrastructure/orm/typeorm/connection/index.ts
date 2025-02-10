import retry from 'async-retry'
import {
  Connection,
  createConnection as typeormCreateConnection,
} from 'typeorm'
import type { Env } from '../../../env'
import ormConfig from '../config/ormconfig'

export const createConnection = async (env: Env): Promise<Connection> => {
  const maximum_retries = 10

  const connection = await retry(
    async () => {
      return await typeormCreateConnection(ormConfig(env))
    },
    {
      onRetry: (e, attempt) => {
        console.log(`${JSON.stringify(e)}`)
        console.log(
          `Unable to connect to database; retrying (attempt: ${attempt}/${maximum_retries}).`
        )
      },
    }
  )

  return connection
}
