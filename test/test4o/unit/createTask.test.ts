import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { createTaskController } from '../../../src/interface/controllers/createTaskController'
import type { TaskRepositoryPort } from '../../../src/application/port/repositories/TaskRepositoryPort'
import { missingRequiredParameterError } from '../../../src/application/errors/MissingRequiredParameterError'
import { taskIDAlreadyExistsError } from '../../../src/application/errors/TaskIDAlreadyExistsError'

describe('createTaskController', () => {
  let mockTaskRepository: Pick<TaskRepositoryPort, 'create' | 'findById'>

  beforeEach(() => {
    mockTaskRepository = {
      create: jest.fn(async (id, title, description) =>
        E.right({ id, title, description })
      ),
      findById: jest.fn(async (id) => O.none),
    }
  })

  it('should create a new task successfully when given valid input', async () => {
    const input = { id: 1, title: 'Test Task', description: 'Test Description' }
    const result = await createTaskController(input, mockTaskRepository)
    expect(result).toEqual(
      E.right({ id: 1, title: 'Test Task', description: 'Test Description' })
    )
  })

  it('should return an error if id is undefined', async () => {
    const input = {
      id: (undefined as unknown) as number,
      title: 'Test Task',
      description: 'Test Description',
    }
    const result = await createTaskController(input, mockTaskRepository)
    expect(result).toEqual(
      E.left(missingRequiredParameterError("'id' is undefined."))
    )
  })

  it('should return an error if title is undefined', async () => {
    const input = {
      id: 1,
      title: (undefined as unknown) as string,
      description: 'Test Description',
    }
    const result = await createTaskController(input, mockTaskRepository)
    expect(result).toEqual(
      E.left(missingRequiredParameterError("'title' is undefined."))
    )
  })

  it('should return an error if description is undefined', async () => {
    const input = {
      id: 1,
      title: 'Test Task',
      description: (undefined as unknown) as string,
    }
    const result = await createTaskController(input, mockTaskRepository)
    expect(result).toEqual(
      E.left(missingRequiredParameterError("'description' is undefined."))
    )
  })

  it('should return an error if task ID already exists', async () => {
    mockTaskRepository.findById = jest.fn(async (id) =>
      O.some({
        id: 1,
        title: 'Existing Task',
        description: 'Existing Description',
      })
    )
    const input = { id: 1, title: 'Test Task', description: 'Test Description' }
    const result = await createTaskController(input, mockTaskRepository)
    expect(result).toEqual(E.left(taskIDAlreadyExistsError(1)))
  })
})
