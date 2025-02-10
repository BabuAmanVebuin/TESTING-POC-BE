import * as E from 'fp-ts/Either'
import type { Response, Router } from 'express'
import { ApplicationError } from '../../../application/errors'
import { PaymentRecordRepositoryPort } from '../../../application/port/repositories/PaymentRecordRepositoryPort'
import { asyncWrapper } from '../util'
import { getPaymentRecordByIdNameController } from '../../controllers/paymentRecord/getPaymentRecordByIdNameController'
import { PaymentRecordDto } from '../../../domain/models/PaymentRecordDto'

const handleResult = (
  res: Response,
  ePaymentRecord: E.Either<ApplicationError, PaymentRecordDto>
): void => {
  if (E.isRight(ePaymentRecord)) {
    res.status(200).send(JSON.stringify(ePaymentRecord.right))
  } else {
    const error: ApplicationError = ePaymentRecord.left
    res.status(404).send(error.message)
  }
}

export const getPaymentRecordByIdName = (
  router: Router,
  repository: PaymentRecordRepositoryPort
): void => {
  router.get(
    '/payment-record/:idName',
    asyncWrapper(async (req, res) => {
      const { idName } = req.params
      const ePaymentRecord = await getPaymentRecordByIdNameController(
        idName as string,
        repository
      )
      handleResult(res, ePaymentRecord)
    })
  )
}
