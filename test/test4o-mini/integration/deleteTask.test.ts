import { deleteTaskController } from '../../../src/interface/controllers/deleteTaskController'
import { taskRepositoryInMemory } from '../../../src/infrastructure/repositories/taskRepositoryInMemory'
import { Task } from '../../../src/domain/models/Task'

describe('Delete Task Controller', () => {
  let tasks: Task[]
  let taskRepository: ReturnType<typeof taskRepositoryInMemory>

  beforeEach(() => {
    tasks = []
    taskRepository = taskRepositoryInMemory(tasks)
  })

  it('should delete a task by ID successfully', async () => {
    tasks.push({ id: 1, title: 'Task 1', description: 'Description 1' })
    tasks.push({ id: 2, title: 'Task 2', description: 'Description 2' })

    await deleteTaskController({ id: 1 }, taskRepository)

    expect(tasks).toHaveLength(1)
    expect(tasks).toEqual([
      { id: 2, title: 'Task 2', description: 'Description 2' },
    ])
  })

  it('should not delete a task if ID does not exist', async () => {
    tasks.push({ id: 1, title: 'Task 1', description: 'Description 1' })

    await deleteTaskController({ id: 3 }, taskRepository)

    expect(tasks).toHaveLength(1)
    expect(tasks).toEqual([
      { id: 1, title: 'Task 1', description: 'Description 1' },
    ])
  })

  it('should delete multiple tasks by IDs', async () => {
    tasks.push({ id: 1, title: 'Task 1', description: 'Description 1' })
    tasks.push({ id: 2, title: 'Task 2', description: 'Description 2' })
    tasks.push({ id: 3, title: 'Task 3', description: 'Description 3' })

    await deleteTaskController({ id: 2 }, taskRepository)

    expect(tasks).toHaveLength(2)
    expect(tasks).toEqual([
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 3, title: 'Task 3', description: 'Description 3' },
    ])
  })

  it('should not alter the task list if trying to delete from an empty list', async () => {
    await deleteTaskController({ id: 1 }, taskRepository)

    expect(tasks).toHaveLength(0)
  })
})
