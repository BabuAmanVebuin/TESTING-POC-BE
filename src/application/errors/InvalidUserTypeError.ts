import { UserTypeEnum } from '../../infrastructure/orm/typeorm/entities/PaymentRecord'

export type InvalidUserTypeError = {
  readonly _tag: 'InvalidUserTypeError'
  readonly message: string
}

export const invalidUserTypeError = (
  userType: UserTypeEnum
): InvalidUserTypeError => ({
  _tag: 'InvalidUserTypeError',
  message: `ApplicationError: Invalid user type '${userType}' provided! Valid user types are: ${Object.values(
    UserTypeEnum
  ).join(', ')}.`,
})
