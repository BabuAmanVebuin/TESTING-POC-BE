import * as dotenv from 'dotenv'
import { loadEnv } from './src/infrastructure/env/index'
import { createConnection } from './src/infrastructure/orm/typeorm/connection'
import { taskRepositoryMySQL } from './src/infrastructure/repositories/taskRepositoryMySQL'
import { createServer } from './src/infrastructure/webserver/express'
import { paymentRecordRepositoryMySQL } from './src/infrastructure/repositories/paymentRecordRepositoryMySQL'
import { userRepositoryMySQL } from './src/infrastructure/repositories/userRepositoryMySQL'
import { familyDetailRepositoryMySQL } from './src/infrastructure/repositories/familyDetailRepositoryMySQL'
import { userDocumentRepositoryMySQL } from './src/infrastructure/repositories/UserDocumentRepositoryMySQL'

const main = async () => {
  dotenv.config()
  console.log(`NODE_ENV: ${process.env['NODE_ENV']}`)
  const env = await loadEnv()
  const connection = await createConnection(env)
  const taskRepository = await taskRepositoryMySQL(connection)
  const paymentRecordRepository = await paymentRecordRepositoryMySQL(connection)
  const userRepository = await userRepositoryMySQL(connection)
  const familyDetailRepository = await familyDetailRepositoryMySQL(connection)
  const userDocumentRepository = await userDocumentRepositoryMySQL(connection)
  createServer(
    taskRepository,
    paymentRecordRepository,
    userRepository,
    familyDetailRepository,
    userDocumentRepository,
    env
  )
}

main()
