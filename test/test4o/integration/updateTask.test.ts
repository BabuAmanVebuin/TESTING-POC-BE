import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { updateTaskController } from '../../../src/interface/controllers/updateTaskController'
import { taskRepositoryInMemory } from '../../../src/infrastructure/repositories/taskRepositoryInMemory'
import { missingRequiredParameterError } from '../../../src/application/errors/MissingRequiredParameterError'
import { taskIDDoesntExistError } from '../../../src/application/errors/TaskIDDoesntExistError'

describe('Update Task Integration Test', () => {
  const initialTasks = [
    { id: 1, title: 'Task 1', description: 'Description 1' },
    { id: 2, title: 'Task 2', description: 'Description 2' },
  ]

  let taskRepository: ReturnType<typeof taskRepositoryInMemory>

  beforeEach(() => {
    taskRepository = taskRepositoryInMemory([...initialTasks])
  })

  test('successfully update a task', async () => {
    const result = await updateTaskController(
      { id: 1, title: 'Updated Task 1', description: 'Updated Description 1' },
      taskRepository
    )

    expect(E.isRight(result)).toBe(true)
    if (E.isRight(result)) {
      expect(result.right).toBe('Successfully updated!')
    }

    const allTasks = await taskRepository.findAll()
    expect(allTasks).toContainEqual({
      id: 1,
      title: 'Updated Task 1',
      description: 'Updated Description 1',
    })
  })

  test('fail to update a task with invalid id', async () => {
    const result = await updateTaskController(
      { id: 99, title: 'Invalid Update', description: 'Invalid Description' },
      taskRepository
    )

    expect(E.isLeft(result)).toBe(true)
    if (E.isLeft(result)) {
      expect(result.left).toEqual(taskIDDoesntExistError(99))
    }
  })

  test('fail to update a task due to missing id', async () => {
    const result = await updateTaskController(
      { id: undefined as any, title: '', description: '' },
      taskRepository
    )

    expect(E.isLeft(result)).toBe(true)
    if (E.isLeft(result)) {
      expect(result.left).toEqual(
        missingRequiredParameterError("'id' is undefined.")
      )
    }
  })

  test('fail to update a task due to missing title', async () => {
    const result = await updateTaskController(
      { id: 1, title: undefined as any, description: 'Updated Description' },
      taskRepository
    )

    expect(E.isLeft(result)).toBe(true)
    if (E.isLeft(result)) {
      expect(result.left).toEqual(
        missingRequiredParameterError("'title' is undefined.")
      )
    }
  })

  test('fail to update a task due to missing description', async () => {
    const result = await updateTaskController(
      { id: 1, title: 'Updated Title', description: undefined as any },
      taskRepository
    )

    expect(E.isLeft(result)).toBe(true)
    if (E.isLeft(result)) {
      expect(result.left).toEqual(
        missingRequiredParameterError("'description' is undefined.")
      )
    }
  })
})
