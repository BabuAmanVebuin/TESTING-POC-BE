import type { TaskRepositoryPort } from '../../application/port/repositories/TaskRepositoryPort'
import { deleteTaskUseCase } from '../../application/use_cases/deleteTaskUseCase'

export const deleteTaskController = async (
  input: {
    id: number
  },
  services: Pick<TaskRepositoryPort, 'delete_'>
): Promise<void> => {
  const { id } = input

  return deleteTaskUseCase(id, services)
}
