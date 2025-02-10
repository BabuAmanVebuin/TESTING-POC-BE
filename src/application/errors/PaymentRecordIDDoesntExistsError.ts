export type PaymentRecordIDDoesntExistsError = {
  readonly _tag: 'PaymentRecordIDDoesntExistsError'
  readonly message: string
}

export const paymentRecordIDDoesntExistsError = (
  idName: string
): PaymentRecordIDDoesntExistsError => ({
  _tag: 'PaymentRecordIDDoesntExistsError',
  message: `ApplicationError: Payment Record ${idName} doesnt exists!`,
})
