import type { TaskRepositoryPort } from '../port/repositories/TaskRepositoryPort'

export const deleteTaskUseCase = (
  id: number,
  taskRepository: Pick<TaskRepositoryPort, 'delete_'>
): Promise<void> => {
  return taskRepository.delete_(id)
}
