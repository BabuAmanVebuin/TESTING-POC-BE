import * as E from 'fp-ts/Either'
import type { Response, Router } from 'express'
import { ApplicationError } from '../../../application/errors'
import { PaymentRecordRepositoryPort } from '../../../application/port/repositories/PaymentRecordRepositoryPort'
import { asyncWrapper } from '../util'
import { getPaymentRecordsController } from '../../controllers/paymentRecord/getPaymentRecordsController'
import { PaymentRecordDto } from '../../../domain/models/PaymentRecordDto'

const handleResult = (
  res: Response,
  ePaymentRecords: E.Either<ApplicationError, PaymentRecordDto[]>
): void => {
  if (E.isRight(ePaymentRecords)) {
    res.status(200).send(JSON.stringify(ePaymentRecords.right))
  } else {
    const error: ApplicationError = ePaymentRecords.left
    res.status(500).send(error.message)
  }
}

export const getPaymentRecords = (
  router: Router,
  repository: PaymentRecordRepositoryPort
): void => {
  router.get(
    '/payment-records',
    asyncWrapper(async (_req, res) => {
      const ePaymentRecords = await getPaymentRecordsController(repository)
      handleResult(res, ePaymentRecords)
    })
  )
}
