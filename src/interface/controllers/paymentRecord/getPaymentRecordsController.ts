import * as E from 'fp-ts/Either'
import { PaymentRecordRepositoryPort } from '../../../application/port/repositories/PaymentRecordRepositoryPort'
import { ApplicationError } from '../../../application/errors'
import { getPaymentRecordsUseCase } from '../../../application/use_cases/paymentRecord/getPaymentRecordsUseCase'
import { PaymentRecordDto } from '../../../domain/models/PaymentRecordDto'

export const getPaymentRecordsController = async (
  repository: PaymentRecordRepositoryPort
): Promise<E.Either<ApplicationError, PaymentRecordDto[]>> => {
  return getPaymentRecordsUseCase(repository)
}
