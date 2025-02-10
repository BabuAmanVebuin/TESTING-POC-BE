import * as E from 'fp-ts/Either'
import { PaymentRecordRepositoryPort } from '../../../application/port/repositories/PaymentRecordRepositoryPort'
import { ApplicationError } from '../../../application/errors'
import { UserTypeEnum } from '../../../infrastructure/orm/typeorm/entities/PaymentRecord'
import { createPaymentRecordUseCase } from '../../../application/use_cases/paymentRecord/createPaymentRecordUseCase'
import { PaymentRecordDto } from '../../../domain/models/PaymentRecordDto'
import { UserRepositoryPort } from '../../../application/port/repositories/userRepositoryPort'
import { missingRequiredParameterError } from '../../../application/errors/MissingRequiredParameterError'

export const createPaymentRecordController = async (
  input: {
    idName: string
    userId: number
    fullName: string
    firstPayment?: number
    secondPayment?: number
    thirdPayment?: number
    fourthPayment?: number
    fifthPayment?: number
    sixthPayment?: number
    seventhPayment?: number
    eighthPayment?: number
    ninthPayment?: number
    tenthPayment?: number
    eleventhPayment?: number
    twelfthPayment?: number
    userType: UserTypeEnum
  },
  services: Pick<PaymentRecordRepositoryPort, 'create' | 'findByIdName'>,
  userServices: Pick<UserRepositoryPort, 'findById'>
): Promise<E.Either<ApplicationError, PaymentRecordDto>> => {
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
  } = input

  // ✅ Validate required parameters
  if (!idName) {
    return E.left(missingRequiredParameterError(`'idName' is missing.`))
  }
  if (!fullName) {
    return E.left(missingRequiredParameterError(`'fullName' is missing.`))
  }
  if (!userType) {
    return E.left(missingRequiredParameterError(`'userType' is missing.`))
  }
  if (!userId) {
    return E.left(missingRequiredParameterError(`'userId' is missing.`))
  }

  return createPaymentRecordUseCase(
    idName,
    userId,
    fullName,
    userType,
    services,
    userServices,
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
    twelfthPayment
  )
}
