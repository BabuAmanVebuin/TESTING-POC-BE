import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { deleteTaskController } from '../../../src/interface/controllers/deleteTaskController'
import { taskRepositoryInMemory } from '../../../src/infrastructure/repositories/taskRepositoryInMemory'
import type { Task } from '../../../src/domain/models/Task'

describe('Delete Task Integration Test', () => {
  let tasks: Task[]
  let services: ReturnType<typeof taskRepositoryInMemory>

  beforeEach(() => {
    tasks = [
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 2, title: 'Task 2', description: 'Description 2' },
    ]
    services = taskRepositoryInMemory(tasks)
  })

  it('should delete a task successfully', async () => {
    await deleteTaskController({ id: 1 }, services)
    const allTasks = await services.findAll()
    expect(allTasks).toHaveLength(1)
    expect(allTasks[0].id).toBe(2)
  })

  it('should handle non-existent task deletion gracefully', async () => {
    await deleteTaskController({ id: 999 }, services)
    const allTasks = await services.findAll()
    expect(allTasks).toHaveLength(2)
  })

  it('should ensure the task does not exist after deletion', async () => {
    await deleteTaskController({ id: 1 }, services)
    const task = await services.findById(1)
    expect(O.isNone(task)).toBe(true)
  })

  it('should not delete any task if task id does not exist', async () => {
    await deleteTaskController({ id: 999 }, services)
    const task1 = await services.findById(1)
    const task2 = await services.findById(2)
    expect(O.isSome(task1)).toBe(true)
    expect(O.isSome(task2)).toBe(true)
  })
})
