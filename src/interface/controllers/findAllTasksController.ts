import type { TaskRepositoryPort } from '../../application/port/repositories/TaskRepositoryPort'
import { findAllTasksUseCase } from '../../application/use_cases/findAllTasksUseCase'
import type { Task } from '../../domain/models/Task'

export const findAllTasksController = async (
  services: Pick<TaskRepositoryPort, 'findAll'>
): Promise<Task[]> => {
  return findAllTasksUseCase(services)
}
