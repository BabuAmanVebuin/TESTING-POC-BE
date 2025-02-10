export type InvalidAmountError = {
  readonly _tag: 'InvalidAmountError'
  readonly message: string
}

export const invalidAmountError = (amount: number): InvalidAmountError => ({
  _tag: 'InvalidAmountError',
  message: `ApplicationError: Invalid amount '${amount}' provided! Amount exceeded the limit of 100000000.`,
})
