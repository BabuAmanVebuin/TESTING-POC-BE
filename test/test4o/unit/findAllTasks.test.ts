import * as O from 'fp-ts/Option'
import { findAllTasksController } from '../../../src/interface/controllers/findAllTasksController'
import type { TaskRepositoryPort } from '../../../src/application/port/repositories/TaskRepositoryPort'
import type { Task } from '../../../src/domain/models/Task'

describe('Find All Tasks Controller', () => {
  let mockTaskRepository: jest.Mocked<TaskRepositoryPort>
  const task1: Task = { id: 1, title: 'Task 1', description: 'Description 1' }
  const task2: Task = { id: 2, title: 'Task 2', description: 'Description 2' }
  const tasks: Task[] = [task1, task2]

  beforeEach(() => {
    mockTaskRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete_: jest.fn(),
    }
  })

  it('should retrieve all tasks successfully', async () => {
    mockTaskRepository.findAll.mockResolvedValueOnce(tasks)

    const result = await findAllTasksController({
      findAll: mockTaskRepository.findAll,
    })

    expect(result).toEqual(tasks)
    expect(mockTaskRepository.findAll).toHaveBeenCalledTimes(1)
  })

  it('should return an empty array if there are no tasks', async () => {
    mockTaskRepository.findAll.mockResolvedValueOnce([])

    const result = await findAllTasksController({
      findAll: mockTaskRepository.findAll,
    })

    expect(result).toEqual([])
    expect(mockTaskRepository.findAll).toHaveBeenCalledTimes(1)
  })
})
