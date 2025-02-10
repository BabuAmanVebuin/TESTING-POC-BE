import type { Task } from '../../domain/models/Task'
import type { TaskRepositoryPort } from '../port/repositories/TaskRepositoryPort'

export const findAllTasksUseCase = (
  taskRepository: Pick<TaskRepositoryPort, 'findAll'>
): Promise<Task[]> => {
  return taskRepository.findAll()
}
