import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import type { ApplicationError } from '../../application/errors'
import { taskIDDoesntExistError } from '../errors/TaskIDDoesntExistError'
import type { TaskRepositoryPort } from '../port/repositories/TaskRepositoryPort'

export const updateTaskUseCase = async (
  id: number,
  title: string,
  description: string,
  taskRepository: Pick<TaskRepositoryPort, 'update' | 'findById'>
): Promise<E.Either<ApplicationError, string>> => {
  const existingTask = await taskRepository.findById(id)
  if (O.isNone(existingTask)) {
    return E.left(taskIDDoesntExistError(id))
  }
  return taskRepository.update(id, title, description)
}
