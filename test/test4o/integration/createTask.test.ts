import * as E from 'fp-ts/Either'
import { createTaskController } from '../../../src/interface/controllers/createTaskController'
import { taskRepositoryInMemory } from '../../../src/infrastructure/repositories/taskRepositoryInMemory'
import { missingRequiredParameterError } from '../../../src/application/errors/MissingRequiredParameterError'
import { taskIDAlreadyExistsError } from '../../../src/application/errors/TaskIDAlreadyExistsError'
import type { Task } from '../../../src/domain/models/Task'

describe('Create Task Integration Test', () => {
  const initialTasks: Task[] = [
    { id: 1, title: 'Existing Task', description: 'Already exists' },
  ]
  const taskRepository = taskRepositoryInMemory(initialTasks)

  test('successfully creates a new task', async () => {
    const input = { id: 2, title: 'New Task', description: 'New description' }
    const result = await createTaskController(input, taskRepository)
    expect(E.isRight(result)).toBeTruthy()
    if (E.isRight(result)) {
      expect(result.right).toEqual(input)
    }
  })

  test('fails when task ID already exists', async () => {
    const input = { id: 1, title: 'Another Task', description: 'Description' }
    const result = await createTaskController(input, taskRepository)
    expect(E.isLeft(result)).toBeTruthy()
    if (E.isLeft(result)) {
      expect(result.left).toEqual(taskIDAlreadyExistsError(1))
    }
  })

  test('fails when ID is undefined', async () => {
    const input = { title: 'No ID Task', description: 'Description' } as any
    const result = await createTaskController(input, taskRepository)
    expect(E.isLeft(result)).toBeTruthy()
    if (E.isLeft(result)) {
      expect(result.left).toEqual(
        missingRequiredParameterError("'id' is undefined.")
      )
    }
  })

  test('fails when title is undefined', async () => {
    const input = { id: 3, description: 'No title' } as any
    const result = await createTaskController(input, taskRepository)
    expect(E.isLeft(result)).toBeTruthy()
    if (E.isLeft(result)) {
      expect(result.left).toEqual(
        missingRequiredParameterError("'title' is undefined.")
      )
    }
  })

  test('fails when description is undefined', async () => {
    const input = { id: 4, title: 'No Description' } as any
    const result = await createTaskController(input, taskRepository)
    expect(E.isLeft(result)).toBeTruthy()
    if (E.isLeft(result)) {
      expect(result.left).toEqual(
        missingRequiredParameterError("'description' is undefined.")
      )
    }
  })
})
