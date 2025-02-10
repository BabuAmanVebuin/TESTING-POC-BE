import * as E from 'fp-ts/Either'
import { PaymentRecordRepositoryPort } from '../../../application/port/repositories/PaymentRecordRepositoryPort'
import { ApplicationError } from '../../../application/errors'
import { getPaymentRecordByIdNameUseCase } from '../../../application/use_cases/paymentRecord/getPaymentRecordByIdNameUseCase'
import { PaymentRecordDto } from '../../../domain/models/PaymentRecordDto'

export const getPaymentRecordByIdNameController = async (
  idName: string,
  repository: PaymentRecordRepositoryPort
): Promise<E.Either<ApplicationError, PaymentRecordDto>> => {
  return getPaymentRecordByIdNameUseCase(idName, repository)
}
