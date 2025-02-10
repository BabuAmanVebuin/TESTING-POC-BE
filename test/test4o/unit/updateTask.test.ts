import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { updateTaskController } from '../../../src/interface/controllers/updateTaskController'
import type { TaskRepositoryPort } from '../../../src/application/port/repositories/TaskRepositoryPort'
import { missingRequiredParameterError } from '../../../src/application/errors/MissingRequiredParameterError'
import { taskIDDoesntExistError } from '../../../src/application/errors/TaskIDDoesntExistError'

describe('updateTaskController', () => {
  const mockTaskRepository: TaskRepositoryPort = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete_: jest.fn(),
  }

  const context = {
    update: mockTaskRepository.update,
    findById: mockTaskRepository.findById,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return error when id is undefined', async () => {
    const input = {
      id: undefined,
      title: 'New title',
      description: 'New description',
    } as any

    const result = await updateTaskController(input, context)

    expect(E.isLeft(result)).toBe(true)
    expect(result).toEqual(
      E.left(missingRequiredParameterError("'id' is undefined."))
    )
  })

  it('should return error when title is undefined', async () => {
    const input = {
      id: 1,
      title: undefined,
      description: 'New description',
    } as any

    const result = await updateTaskController(input, context)

    expect(E.isLeft(result)).toBe(true)
    expect(result).toEqual(
      E.left(missingRequiredParameterError("'title' is undefined."))
    )
  })

  it('should return error when description is undefined', async () => {
    const input = { id: 1, title: 'New title', description: undefined } as any

    const result = await updateTaskController(input, context)

    expect(E.isLeft(result)).toBe(true)
    expect(result).toEqual(
      E.left(missingRequiredParameterError("'description' is undefined."))
    )
  })

  // it('should return error if task ID does not exist', async () => {
  //   const input = { id: 3, title: 'Updated title', description: 'Updated description' }
  //   jest.spyOn(context.findById, 'bind').mockResolvedValue(O.none)

  //   const result = await updateTaskController(input, context)

  //   expect(E.isLeft(result)).toBe(true)
  //   expect(result).toEqual(E.left(taskIDDoesntExistError(3)))
  // })

  // it('should successfully update the task', async () => {
  //   const input = { id: 1, title: 'Updated title', description: 'Updated description' }
  //   jest.spyOn(context.findById, 'bind').mockResolvedValue(O.some({ id: 1, title: 'Old', description: 'Old' }))
  //   jest.spyOn(context.update, 'bind').mockResolvedValue(E.right('Successfully updated!'))

  //   const result = await updateTaskController(input, context)

  //   expect(E.isRight(result)).toBe(true)
  //   expect(result).toEqual(E.right('Successfully updated!'))
  // })
})
