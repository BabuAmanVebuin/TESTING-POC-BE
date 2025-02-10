import * as E from 'fp-ts/Either'
import type { ApplicationError } from '../../application/errors'
import { missingRequiredParameterError } from '../../application/errors/MissingRequiredParameterError'
import type { TaskRepositoryPort } from '../../application/port/repositories/TaskRepositoryPort'
import { updateTaskUseCase } from '../../application/use_cases/updateTaskUseCase'

export const updateTaskController = async (
  input: {
    id: number
    title: string
    description: string
  },
  services: Pick<TaskRepositoryPort, 'update' | 'findById'>
): Promise<E.Either<ApplicationError, string>> => {
  const { id, title, description } = input

  /* TODO: Write better validations here. */
  if (id === undefined)
    return E.left(missingRequiredParameterError("'id' is undefined."))
  if (title === undefined)
    return E.left(missingRequiredParameterError("'title' is undefined."))
  if (description === undefined)
    return E.left(missingRequiredParameterError("'description' is undefined."))

  return await updateTaskUseCase(id, title, description, services)
}
