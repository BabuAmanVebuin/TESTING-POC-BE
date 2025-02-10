export type UserDocumentAlreadyExistsError = {
  readonly _tag: 'UserDocumentAlreadyExistsError'
  readonly message: string
}

export const userDocumentAlreadyExistsError = (
  userId: number,
  documentType: string
): UserDocumentAlreadyExistsError => ({
  _tag: 'UserDocumentAlreadyExistsError',
  message: `ApplicationError: User Document ${documentType} already exists! for user with id ${userId}.`,
})
