import { findAllTasksController } from '../../../src/interface/controllers/findAllTasksController'
import { taskRepositoryInMemory } from '../../../src/infrastructure/repositories/taskRepositoryInMemory'
import * as E from 'fp-ts/Either'
import type { Task } from '../../../src/domain/models/Task'

describe('Integration Test: Retrieve all tasks', () => {
  let tasks: Task[]

  beforeEach(() => {
    tasks = [
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 2, title: 'Task 2', description: 'Description 2' },
    ]
  })

  it('should retrieve all tasks successfully', async () => {
    const taskRepository = taskRepositoryInMemory(tasks)
    const result = await findAllTasksController(taskRepository)
    expect(result).toHaveLength(2)
    expect(result).toEqual(tasks)
  })

  it('should return an empty array when there are no tasks', async () => {
    const taskRepository = taskRepositoryInMemory([])
    const result = await findAllTasksController(taskRepository)
    expect(result).toHaveLength(0)
    expect(result).toEqual([])
  })
})
