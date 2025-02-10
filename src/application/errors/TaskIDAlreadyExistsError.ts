export type TaskIDAlreadyExistsError = {
  readonly _tag: 'TaskIDAlreadyExistsError'
  readonly message: string
}

export const taskIDAlreadyExistsError = (
  id: number
): TaskIDAlreadyExistsError => ({
  _tag: 'TaskIDAlreadyExistsError',
  message: `ApplicationError: Task ${id} already exists!`,
})
