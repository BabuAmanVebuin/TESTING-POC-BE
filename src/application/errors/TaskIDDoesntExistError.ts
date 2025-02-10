export type TaskIDDoesntExistError = {
  readonly _tag: 'TaskIDDoesntExistError'
  readonly message: string
}

export const taskIDDoesntExistError = (id: number): TaskIDDoesntExistError => ({
  _tag: 'TaskIDDoesntExistError',
  message: `ApplicationError: Task ${id} doesn't exist!`,
})
