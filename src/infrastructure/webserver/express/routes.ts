import { PaymentRecordRepositoryPort } from '../../../application/port/repositories/PaymentRecordRepositoryPort'
import type { TaskRepositoryPort } from '../../../application/port/repositories/TaskRepositoryPort'
import { UserRepositoryPort } from '../../../application/port/repositories/userRepositoryPort'
import { createTask } from '../../../interface/routes/createTask'
import { deleteTask } from '../../../interface/routes/deleteTask'
import { findAllTasks } from '../../../interface/routes/findAllTasks'
import { findTaskById } from '../../../interface/routes/findTaskById'
import { getAllUsers } from '../../../interface/routes/user/getAllUsers'
import { createPaymentRecord } from '../../../interface/routes/paymentRecord/createPaymentRecord'
import { getPaymentRecordByIdName } from '../../../interface/routes/paymentRecord/getPaymentRecordByIdName'
import { getPaymentRecords } from '../../../interface/routes/paymentRecord/getPaymentRecords'
import { updateTask } from '../../../interface/routes/updateTask'
import { apiDocs } from './apiDocs'
import express from 'express'
import { FamilyDetailRepositoryPort } from '../../../application/port/repositories/familyDetailRepositoryPort'
import { createFamilyDetail } from '../../../interface/routes/familyDetail/createFamilyDetail'
import { UserDocumentRepositoryPort } from '../../../application/port/repositories/userDocumentRepositoryPort'
import { createUserDocument } from '../../../interface/routes/userDocument/createUserDocument'

export const createRouter = (
  taskRepository: TaskRepositoryPort,
  paymentRecordRepository: PaymentRecordRepositoryPort,
  userRepository: UserRepositoryPort,
  familyDetailRepository: FamilyDetailRepositoryPort,
  userDocumentRepository: UserDocumentRepositoryPort
): express.Router => {
  const router = express.Router()

  apiDocs(router)
  createTask(router, taskRepository)
  deleteTask(router, taskRepository)
  findAllTasks(router, taskRepository)
  findTaskById(router, taskRepository)
  updateTask(router, taskRepository)

  createPaymentRecord(router, paymentRecordRepository, userRepository)
  getPaymentRecords(router, paymentRecordRepository)
  getPaymentRecordByIdName(router, paymentRecordRepository)

  getAllUsers(router, userRepository)

  createFamilyDetail(router, familyDetailRepository, userRepository)

  createUserDocument(router, userDocumentRepository, userRepository)

  return router
}
