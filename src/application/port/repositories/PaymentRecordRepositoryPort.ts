import type * as E from 'fp-ts/Either'
import type * as O from 'fp-ts/Option'
import type { ApplicationError } from '../../errors'
import { PaymentRecordDto } from '../../../domain/models/PaymentRecordDto'
import { UserTypeEnum } from '../../../infrastructure/orm/typeorm/entities/PaymentRecord'

export type PaymentRecordRepositoryPort = {
  findAll: () => Promise<PaymentRecordDto[]>
  findById: (id: number) => Promise<O.Option<PaymentRecordDto>>
  findByIdName: (idName: string) => Promise<O.Option<PaymentRecordDto>>
  create: (
    idName: string,
    userId: number,
    fullName: string,
    userType: UserTypeEnum,
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
  ) => Promise<E.Either<ApplicationError, PaymentRecordDto>>
  update: (
    idName: string,
    userId: number,
    fullName: string,
    userType: UserTypeEnum,
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
  ) => Promise<E.Either<ApplicationError, string>>
  delete_: (id: number) => Promise<void>
}
