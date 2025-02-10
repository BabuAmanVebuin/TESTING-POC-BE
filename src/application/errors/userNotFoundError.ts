export type UserNotFoundError = {
  readonly _tag: 'UserNotFoundError'
  readonly message: string
}

export const userNotFoundError = (id: number): UserNotFoundError => ({
  _tag: 'UserNotFoundError',
  message: `ApplicationError: User ${id} doesn't exist!`,
})
