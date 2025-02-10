import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import {
  PaymentRecord,
  UserTypeEnum,
} from '../orm/typeorm/entities/PaymentRecord'
import type { Connection } from 'typeorm'
import type { ApplicationError } from '../../application/errors'
import { PaymentRecordRepositoryPort } from '../../application/port/repositories/PaymentRecordRepositoryPort'
import { missingRequiredParameterError } from '../../application/errors/MissingRequiredParameterError'

export const paymentRecordRepositoryMySQL = async (
  connection: Connection
): Promise<PaymentRecordRepositoryPort> => ({
  findAll: async (): Promise<PaymentRecord[]> => {
    const paymentRecordRepository = connection.getRepository(PaymentRecord)
    return paymentRecordRepository.find({
      relations: ['userId'],
    })
  },

  findByIdName: async (idName: string): Promise<O.Option<PaymentRecord>> => {
    const paymentRecordRepository = connection.getRepository(PaymentRecord)
    const result = await paymentRecordRepository.findOne({ where: { idName } })
    return result === undefined ? O.none : O.some(result)
  },

  findById: async (id: number): Promise<O.Option<PaymentRecord>> => {
    const paymentRecordRepository = connection.getRepository(PaymentRecord)
    const result = await paymentRecordRepository.findOne({ where: { id } })
    return result === undefined ? O.none : O.some(result)
  },

  create: async (
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
  ): Promise<E.Either<ApplicationError, PaymentRecord>> => {
    const paymentRecordRepository = connection.getRepository(PaymentRecord)

    const paymentRecord = new PaymentRecord()
    paymentRecord.idName = idName
    paymentRecord.userId = userId
    paymentRecord.fullName = fullName
    paymentRecord.userType = userType
    paymentRecord.firstPayment = firstPayment !== undefined ? firstPayment : 0
    paymentRecord.secondPayment =
      secondPayment !== undefined ? secondPayment : 0
    paymentRecord.thirdPayment = thirdPayment !== undefined ? thirdPayment : 0
    paymentRecord.fourthPayment =
      fourthPayment !== undefined ? fourthPayment : 0
    paymentRecord.fifthPayment = fifthPayment !== undefined ? fifthPayment : 0
    paymentRecord.sixthPayment = sixthPayment !== undefined ? sixthPayment : 0
    paymentRecord.seventhPayment =
      seventhPayment !== undefined ? seventhPayment : 0
    paymentRecord.eighthPayment =
      eighthPayment !== undefined ? eighthPayment : 0
    paymentRecord.ninthPayment = ninthPayment !== undefined ? ninthPayment : 0
    paymentRecord.tenthPayment = tenthPayment !== undefined ? tenthPayment : 0
    paymentRecord.eleventhPayment =
      eleventhPayment !== undefined ? eleventhPayment : 0
    paymentRecord.twelfthPayment =
      twelfthPayment !== undefined ? twelfthPayment : 0

    const result = await paymentRecordRepository.save(paymentRecord)
    console.log('PaymentRecord has been saved: ', paymentRecord)

    return E.right(result)
  },

  update: async (
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
  ): Promise<E.Either<ApplicationError, string>> => {
    const paymentRecordRepository = connection.getRepository(PaymentRecord)

    const paymentRecord = await paymentRecordRepository.findOne({
      where: { idName },
    })
    if (!paymentRecord) {
      return E.left(missingRequiredParameterError("'idName' is not found."))
    }

    paymentRecord.idName = idName
    paymentRecord.userId = userId
    paymentRecord.fullName = fullName
    paymentRecord.userType = userType
    paymentRecord.firstPayment = firstPayment !== undefined ? firstPayment : 0
    paymentRecord.secondPayment =
      secondPayment !== undefined ? secondPayment : 0
    paymentRecord.thirdPayment = thirdPayment !== undefined ? thirdPayment : 0
    paymentRecord.fourthPayment =
      fourthPayment !== undefined ? fourthPayment : 0
    paymentRecord.fifthPayment = fifthPayment !== undefined ? fifthPayment : 0
    paymentRecord.sixthPayment = sixthPayment !== undefined ? sixthPayment : 0
    paymentRecord.seventhPayment =
      seventhPayment !== undefined ? seventhPayment : 0
    paymentRecord.eighthPayment =
      eighthPayment !== undefined ? eighthPayment : 0
    paymentRecord.ninthPayment = ninthPayment !== undefined ? ninthPayment : 0
    paymentRecord.tenthPayment = tenthPayment !== undefined ? tenthPayment : 0
    paymentRecord.eleventhPayment =
      eleventhPayment !== undefined ? eleventhPayment : 0
    paymentRecord.twelfthPayment =
      twelfthPayment !== undefined ? twelfthPayment : 0

    await paymentRecordRepository.save(paymentRecord)

    return E.right(
      `PaymentRecord has been updated: ${JSON.stringify(paymentRecord)}`
    )
  },

  delete_: async (id: number): Promise<void> => {
    const paymentRecordRepository = connection.getRepository(PaymentRecord)
    await paymentRecordRepository.delete({ id })
  },
})
