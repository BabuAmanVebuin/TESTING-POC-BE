import * as E from 'fp-ts/Either'
import { ApplicationError } from '../../../application/errors'
import { missingRequiredParameterError } from '../../../application/errors/MissingRequiredParameterError'
import { updatePaymentRecordUseCase } from '../../../application/use_cases/paymentRecord/updatePaymentRecordUseCase'
import { PaymentRecordRepositoryPort } from '../../../application/port/repositories/PaymentRecordRepositoryPort'
import { UserTypeEnum } from '../../../infrastructure/orm/typeorm/entities/PaymentRecord'
import { UserRepositoryPort } from '../../../application/port/repositories/userRepositoryPort'

export const updatePaymentRecordController = async (
  input: {
    idName: string
    userId: number
    fullName: string
    userType: UserTypeEnum
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
  },
  services: Pick<PaymentRecordRepositoryPort, 'update' | 'findByIdName'>,
  userServices: Pick<UserRepositoryPort, 'findById'>
): Promise<E.Either<ApplicationError, string>> => {
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

  if (idName === undefined)
    return E.left(missingRequiredParameterError("'idName' is undefined."))
  if (userId === undefined)
    return E.left(missingRequiredParameterError("'userId' is undefined."))
  if (fullName === undefined)
    return E.left(missingRequiredParameterError("'fullName' is undefined."))
  if (userType === undefined)
    return E.left(missingRequiredParameterError("'userType' is undefined."))

  return await updatePaymentRecordUseCase(
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
