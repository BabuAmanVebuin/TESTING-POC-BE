export type PaymentRecordIDAlreadyExistsError = {
  readonly _tag: 'PaymentRecordIDAlreadyExistsError'
  readonly message: string
}

export const paymentRecordIDAlreadyExistsError = (
  idName: string
): PaymentRecordIDAlreadyExistsError => ({
  _tag: 'PaymentRecordIDAlreadyExistsError',
  message: `ApplicationError: Payment Record ${idName} already exists!`,
})
