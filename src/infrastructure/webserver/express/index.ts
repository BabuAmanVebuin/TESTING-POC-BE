import type { TaskRepositoryPort } from '../../../application/port/repositories/TaskRepositoryPort'
import { createRouter } from './routes'
import cors from 'cors'
import express from 'express'
import type { Env } from '../../env'
import { PaymentRecordRepositoryPort } from '../../../application/port/repositories/PaymentRecordRepositoryPort'
import { UserRepositoryPort } from '../../../application/port/repositories/userRepositoryPort'
import { FamilyDetailRepositoryPort } from '../../../application/port/repositories/familyDetailRepositoryPort'
import { UserDocumentRepositoryPort } from '../../../application/port/repositories/userDocumentRepositoryPort'

export const createServer = (
  taskRepository: TaskRepositoryPort,
  paymentRecordRepository: PaymentRecordRepositoryPort,
  userRepository: UserRepositoryPort,
  familyDetailRepository: FamilyDetailRepositoryPort,
  userDocumentRepository: UserDocumentRepositoryPort,
  env: Env
): void => {
  const app = express()
  const port = env.APPSERVER_PORT

  /* Middlewares */
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  /* Router */
  app.use(
    '/',
    createRouter(
      taskRepository,
      paymentRecordRepository,
      userRepository,
      familyDetailRepository,
      userDocumentRepository
    )
  )

  app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`)
  })
}
