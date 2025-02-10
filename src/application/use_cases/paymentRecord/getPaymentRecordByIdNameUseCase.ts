import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { PaymentRecordRepositoryPort } from '../../port/repositories/PaymentRecordRepositoryPort'
import { ApplicationError } from '../../errors'
import { paymentRecordIDDoesntExistsError } from '../../errors/PaymentRecordIDDoesntExistsError'
import { PaymentRecordDto } from '../../../domain/models/PaymentRecordDto'

export const getPaymentRecordByIdNameUseCase = async (
  idName: string,
  repository: PaymentRecordRepositoryPort
): Promise<E.Either<ApplicationError, PaymentRecordDto>> => {
  try {
    const oPaymentRecord: O.Option<PaymentRecordDto> = await repository.findByIdName(
      idName
    )

    if (O.isNone(oPaymentRecord)) {
      return E.left(paymentRecordIDDoesntExistsError(idName))
    }

    const record = oPaymentRecord.value

    // Function to safely convert payments from string to number
    const toNumber = (value: any): number =>
      value ? parseFloat(value) || 0 : 0

    // Convert payments to numbers
    const firstPayment = toNumber(record.firstPayment)
    const secondPayment = toNumber(record.secondPayment)
    const thirdPayment = toNumber(record.thirdPayment)
    const fourthPayment = toNumber(record.fourthPayment)
    const fifthPayment = toNumber(record.fifthPayment)
    const sixthPayment = toNumber(record.sixthPayment)
    const seventhPayment = toNumber(record.seventhPayment)
    const eighthPayment = toNumber(record.eighthPayment)
    const ninthPayment = toNumber(record.ninthPayment)
    const tenthPayment = toNumber(record.tenthPayment)
    const eleventhPayment = toNumber(record.eleventhPayment)
    const twelfthPayment = toNumber(record.twelfthPayment)

    const sumFirstSix =
      firstPayment +
      secondPayment +
      thirdPayment +
      fourthPayment +
      fifthPayment +
      sixthPayment

    const sumAllTwelve =
      sumFirstSix +
      seventhPayment +
      eighthPayment +
      ninthPayment +
      tenthPayment +
      eleventhPayment +
      twelfthPayment

    const totalContribution = 100000000 // Required total amount
    const percentagePaid = (sumAllTwelve / totalContribution) * 100
    const halfYearContribution = (sumFirstSix / 100) * 758
    const yearlyContribution = (sumAllTwelve / 100) * 758
    const pendingPayment = totalContribution - sumAllTwelve

    const processedRecord = {
      ...record,
      halfYearContribution: halfYearContribution || 0,
      yearlyContribution: yearlyContribution || 0,
      quarterlyContribution:
        ((firstPayment + secondPayment + thirdPayment) / 100) * 758 || 0,
      pendingPayment: pendingPayment >= 0 ? pendingPayment : 0,
      percentagePaid: Math.min(100, parseFloat(percentagePaid.toFixed(2))),
      paymentStatus:
        sumAllTwelve >= totalContribution ? 'Completed' : 'Pending',
    }

    return E.right(processedRecord)
  } catch (error) {
    console.error('Error fetching payment record:', error)
    return E.left(error as ApplicationError)
  }
}
