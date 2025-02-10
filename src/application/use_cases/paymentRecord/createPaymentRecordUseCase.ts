import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { PaymentRecordRepositoryPort } from '../../port/repositories/PaymentRecordRepositoryPort'
import type { ApplicationError } from '../../errors'
import { UserTypeEnum } from '../../../infrastructure/orm/typeorm/entities/PaymentRecord'
import { paymentRecordIDAlreadyExistsError } from '../../errors/PaymentRecordIDAlreadyExistsError'
import { PaymentRecordDto } from '../../../domain/models/PaymentRecordDto'
import { UserRepositoryPort } from '../../port/repositories/userRepositoryPort'
import { userNotFoundError } from '../../errors/UserNotFoundError'
import { UserDto } from '../../../domain/models/UserDto'
import { invalidUserTypeError } from '../../errors/InvalidUserTypeError'
import { invalidAmountError } from '../../errors/InvalidAmountError'

export const createPaymentRecordUseCase = async (
  idName: string,
  userId: number,
  fullName: string,
  userType: UserTypeEnum,
  paymentRecordRepository: Pick<
    PaymentRecordRepositoryPort,
    'create' | 'findByIdName'
  >,
  userRepository: Pick<UserRepositoryPort, 'findById'>,
  firstPayment?: number,
  secondPayment?: number,
  thirdPayment?: number,
  fourthPayment?: number,
  fifthPayment?: number,
  sixthPayment?: number,
  seventhPayment?: number,
  eighthPayment?: number,
  ninthPayment?: number,
  tenthPayment?: number,
  eleventhPayment?: number,
  twelfthPayment?: number
): Promise<E.Either<ApplicationError, PaymentRecordDto>> => {
  // ✅ Check if `User` Exists
  const oExistingUser: O.Option<UserDto> = await userRepository.findById(userId)
  if (O.isNone(oExistingUser)) {
    return E.left(userNotFoundError(userId))
  }

  // ✅ Check if `Payment Record` Exists
  const oExistingPaymentRecord: O.Option<PaymentRecordDto> = await paymentRecordRepository.findByIdName(
    idName
  )
  if (O.isSome(oExistingPaymentRecord)) {
    return E.left(paymentRecordIDAlreadyExistsError(idName))
  }

  // ✅ Check if `userType` is valid
  if (!Object.values(UserTypeEnum).includes(userType)) {
    return E.left(invalidUserTypeError(userType))
  }

  const sumOfPayments =
    (firstPayment ?? 0) +
    (secondPayment ?? 0) +
    (thirdPayment ?? 0) +
    (fourthPayment ?? 0) +
    (fifthPayment ?? 0) +
    (sixthPayment ?? 0) +
    (seventhPayment ?? 0) +
    (eighthPayment ?? 0) +
    (ninthPayment ?? 0) +
    (tenthPayment ?? 0) +
    (eleventhPayment ?? 0) +
    (twelfthPayment ?? 0)

  if (sumOfPayments >= 100000000) {
    return E.left(invalidAmountError(sumOfPayments))
  }

  // ✅ Create the payment record
  return paymentRecordRepository.create(
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
    twelfthPayment
  )
}
