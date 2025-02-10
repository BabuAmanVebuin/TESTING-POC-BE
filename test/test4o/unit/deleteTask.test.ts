import * as E from 'fp-ts/Either'
import { deleteTaskController } from '../../../src/interface/controllers/deleteTaskController'
import type { TaskRepositoryPort } from '../../../src/application/port/repositories/TaskRepositoryPort'

describe('deleteTaskController', () => {
  let mockTaskRepository: jest.Mocked<Pick<TaskRepositoryPort, 'delete_'>>

  beforeEach(() => {
    mockTaskRepository = {
      delete_: jest.fn(),
    }
  })

  it('should successfully delete a task by ID', async () => {
    const input = { id: 1 }
    mockTaskRepository.delete_.mockResolvedValue(void 0)

    await expect(
      deleteTaskController(input, mockTaskRepository)
    ).resolves.toBeUndefined()
    expect(mockTaskRepository.delete_).toHaveBeenCalledWith(input.id)
  })

  it('should handle errors if delete_ throws an error', async () => {
    const input = { id: 1 }
    const error = new Error('delete error')
    mockTaskRepository.delete_.mockRejectedValue(error)

    await expect(
      deleteTaskController(input, mockTaskRepository)
    ).rejects.toThrow('delete error')
    expect(mockTaskRepository.delete_).toHaveBeenCalledWith(input.id)
  })
})
