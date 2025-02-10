import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import type { Task } from '../../domain/models/Task'
import type { ApplicationError } from '../errors'
import { taskIDDoesntExistError } from '../errors/TaskIDDoesntExistError'
import type { TaskRepositoryPort } from '../port/repositories/TaskRepositoryPort'

export const findTaskByIdUseCase = async (
  id: number,
  taskRepository: Pick<TaskRepositoryPort, 'findById'>
): Promise<E.Either<ApplicationError, Task>> => {
  const existingTask = await taskRepository.findById(id)
  if (O.isNone(existingTask)) {
    return E.left(taskIDDoesntExistError(id))
  }
  return E.of(existingTask.value)
}
