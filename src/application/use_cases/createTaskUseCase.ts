import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import type { Task } from '../../domain/models/Task'
import type { ApplicationError } from '../errors'
import { taskIDAlreadyExistsError } from '../errors/TaskIDAlreadyExistsError'
import type { TaskRepositoryPort } from '../port/repositories/TaskRepositoryPort'

export const createTaskUseCase = async (
  id: number,
  title: string,
  description: string,
  taskRepository: Pick<TaskRepositoryPort, 'create' | 'findById'>
): Promise<E.Either<ApplicationError, Task>> => {
  const oExistingTask: O.Option<Task> = await taskRepository.findById(id)
  if (O.isSome(oExistingTask)) {
    return E.left(taskIDAlreadyExistsError(id))
  }
  return taskRepository.create(id, title, description)
}
