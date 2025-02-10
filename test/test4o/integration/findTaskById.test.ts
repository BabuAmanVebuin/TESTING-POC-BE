import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { taskRepositoryInMemory } from '../../../src/infrastructure/repositories/taskRepositoryInMemory'
import { findByIdTaskController } from '../../../src/interface/controllers/findTaskByIdController'
import type { Task } from '../../../src/domain/models/Task'
import { taskIDDoesntExistError } from '../../../src/application/errors/TaskIDDoesntExistError'

describe('Retrieve Task by ID Integration Test', () => {
  const tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description 1' },
    { id: 2, title: 'Task 2', description: 'Description 2' },
  ]

  const taskRepository = taskRepositoryInMemory(tasks)

  test('should retrieve a task by ID successfully', async () => {
    const response = await findByIdTaskController({ id: 1 }, taskRepository)
    expect(E.isRight(response)).toBe(true)
    if (E.isRight(response)) expect(response.right).toEqual(tasks[0])
  })

  test('should fail to retrieve a non-existing task', async () => {
    const response = await findByIdTaskController({ id: 3 }, taskRepository)
    expect(E.isLeft(response)).toBe(true)
    if (E.isLeft(response))
      expect(response.left).toEqual(taskIDDoesntExistError(3))
  })

  test('should retrieve another task by ID successfully', async () => {
    const response = await findByIdTaskController({ id: 2 }, taskRepository)
    expect(E.isRight(response)).toBe(true)
    if (E.isRight(response)) expect(response.right).toEqual(tasks[1])
  })
})
