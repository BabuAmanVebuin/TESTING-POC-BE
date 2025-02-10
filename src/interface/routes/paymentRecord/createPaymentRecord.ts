import { Response, Router } from 'express'
import * as E from 'fp-ts/Either'
import { ApplicationError } from '../../../application/errors'
import { asyncWrapper } from '../util'
import { PaymentRecordRepositoryPort } from '../../../application/port/repositories/PaymentRecordRepositoryPort'
import { createPaymentRecordController } from '../../controllers/paymentRecord/createPaymentRecordController'
import { PaymentRecordDto } from '../../../domain/models/PaymentRecordDto'
import { UserRepositoryPort } from '../../../application/port/repositories/userRepositoryPort'

const handleResult = (
  res: Response,
  eCreatedPaymentRecord: E.Either<ApplicationError, PaymentRecordDto>
): void => {
  if (E.isRight(eCreatedPaymentRecord)) {
    res.status(201).send(JSON.stringify(eCreatedPaymentRecord.right))
  } else {
    const error: ApplicationError = eCreatedPaymentRecord.left
    switch (error._tag) {
      case 'UserNotFoundError':
        res.status(404).send(error.message)
        break
      case 'MissingRequiredParameterError':
        res.status(422).send(error.message)
        break
      case 'PaymentRecordIDAlreadyExistsError':
        res.status(409).send(error.message)
        break
      case 'InvalidUserTypeError':
        res.status(400).send(error.message)
        break
      case 'InvalidAmountError':
        res.status(400).send(error.message)
        break
    }
  }
}

export const createPaymentRecord = (
  router: Router,
  repository: PaymentRecordRepositoryPort,
  userRepository: UserRepositoryPort
): void => {
  router.post(
    '/payment-record',
    asyncWrapper(async (req, res) => {
      const {
        idName,
        userId,
        fullName,
        userType,
        firstPayment,
        secondPayment,
        thirdPayment,
        fourthPayment,
        fifthPayment,
        sixthPayment,
        seventhPayment,
        eighthPayment,
        ninthPayment,
        tenthPayment,
        eleventhPayment,
        twelfthPayment,
      } = req.body

      const eCreatedPaymentRecord = await createPaymentRecordController(
        {
          idName,
          userId,
          fullName,
          userType,
          firstPayment,
          secondPayment,
          thirdPayment,
          fourthPayment,
          fifthPayment,
          sixthPayment,
          seventhPayment,
          eighthPayment,
          ninthPayment,
          tenthPayment,
          eleventhPayment,
          twelfthPayment,
        },
        repository,
        userRepository
      )

      handleResult(res, eCreatedPaymentRecord)
    })
  )
}
