import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { findByIdTaskController } from '../../../src/interface/controllers/findTaskByIdController'
import { findTaskByIdUseCase } from '../../../src/application/use_cases/findTaskByIdUseCase'
import type { Task } from '../../../src/domain/models/Task'
import type { ApplicationError } from '../../../src/application/errors'
import { taskIDDoesntExistError } from '../../../src/application/errors/TaskIDDoesntExistError'

describe('findByIdTaskController', () => {
  jest.mock('../../../src/application/use_cases/findTaskByIdUseCase')
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task',
  }

  const mockRepository = {
    findById: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return a task when it exists', async () => {
    mockRepository.findById.mockResolvedValue(O.some(mockTask))
    const result = await findByIdTaskController({ id: 1 }, mockRepository)

    expect(mockRepository.findById).toHaveBeenCalledWith(1)
    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toEqual(mockTask)
    }
  })

  it('should return an error when the task does not exist', async () => {
    mockRepository.findById.mockResolvedValue(O.none)
    const result = await findByIdTaskController({ id: 2 }, mockRepository)

    expect(mockRepository.findById).toHaveBeenCalledWith(2)
    expect(E.isLeft(result)).toBe(true)
    if (E.isLeft(result)) {
      expect(result.left).toEqual(taskIDDoesntExistError(2))
    }
  })
})
