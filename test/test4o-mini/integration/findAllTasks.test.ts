import { findAllTasksController } from '../../../src/interface/controllers/findAllTasksController'
import { taskRepositoryInMemory } from '../../../src/infrastructure/repositories/taskRepositoryInMemory'
import type { Task } from '../../../src/domain/models/Task'
import * as E from 'fp-ts/Either'

describe('Retrieve all tasks', () => {
  let taskRepository: ReturnType<typeof taskRepositoryInMemory>
  let tasks: Task[]

  beforeEach(() => {
    tasks = []
    taskRepository = taskRepositoryInMemory(tasks)
  })

  test('should return an empty array when no tasks exist', async () => {
    const result = await findAllTasksController(taskRepository)
    expect(result).toEqual([])
  })

  test('should return all tasks when tasks exist', async () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 2, title: 'Task 2', description: 'Description 2' },
    ]
    tasks.push(...mockTasks)

    const result = await findAllTasksController(taskRepository)
    expect(result).toEqual(mockTasks)
  })

  test('should handle errors in retrieving tasks', async () => {
    jest.spyOn(taskRepository, 'findAll').mockImplementationOnce(async () => {
      throw new Error('Database error')
    })

    const result = await findAllTasksController(taskRepository)
    expect(result).toEqual(E.left(new Error('Database error')))
  })
})
