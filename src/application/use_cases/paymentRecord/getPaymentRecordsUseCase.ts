import * as E from 'fp-ts/Either'
import { PaymentRecordRepositoryPort } from '../../port/repositories/PaymentRecordRepositoryPort'
import { ApplicationError } from '../../errors'
import { PaymentRecordDto } from '../../../domain/models/PaymentRecordDto'

export const getPaymentRecordsUseCase = async (
  repository: PaymentRecordRepositoryPort
): Promise<E.Either<ApplicationError, PaymentRecordDto[]>> => {
  try {
    const paymentRecords = await repository.findAll()

    const processedRecords = paymentRecords.map((record) => {
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

      console.log('sumFirstSix', sumFirstSix)

      const sumAllTwelve =
        sumFirstSix +
        seventhPayment +
        eighthPayment +
        ninthPayment +
        tenthPayment +
        eleventhPayment +
        twelfthPayment

      console.log('sumAllTwelve', sumAllTwelve)

      const totalContribution = 100000000
      const percentagePaid = (sumAllTwelve / totalContribution) * 100
      const halfYearContribution = (sumFirstSix / 100) * 758
      const yearlyContribution = (sumAllTwelve / 100) * 758
      const pendingPayment = totalContribution - sumAllTwelve

      return {
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
    })

    console.log('processedRecords', processedRecords)
    return E.right(processedRecords)
  } catch (error) {
    console.error('Error fetching payment records:', error)
    return E.left(error as ApplicationError)
  }
}
