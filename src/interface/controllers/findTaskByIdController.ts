import type * as E from 'fp-ts/Either'
import type { ApplicationError } from '../../application/errors'
import type { TaskRepositoryPort } from '../../application/port/repositories/TaskRepositoryPort'
import { findTaskByIdUseCase } from '../../application/use_cases/findTaskByIdUseCase'
import type { Task } from '../../domain/models/Task'

export const findByIdTaskController = async (
  input: {
    id: number
  },
  services: Pick<TaskRepositoryPort, 'findById'>
): Promise<E.Either<ApplicationError, Task>> => {
  const { id } = input

  return findTaskByIdUseCase(id, services)
}
