export type FamilyDetailAlreadyExistsError = {
  readonly _tag: 'FamilyDetailAlreadyExistsError'
  readonly message: string
}

export const familyDetailAlreadyExistsError = (
  userId: number,
  relation: string
): FamilyDetailAlreadyExistsError => ({
  _tag: 'FamilyDetailAlreadyExistsError',
  message: `ApplicationError: Family Detail ${relation} already exists! for user with id ${userId}.`,
})
