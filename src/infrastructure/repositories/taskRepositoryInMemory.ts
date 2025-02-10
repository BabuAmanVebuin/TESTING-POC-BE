import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import type { ApplicationError } from '../../application/errors'
import type { TaskRepositoryPort } from '../../application/port/repositories/TaskRepositoryPort'
import type { Task } from '../../domain/models/Task'

/**
 * InMemory implementation takes an argument `tasks` to be testable.
 */
export const taskRepositoryInMemory = (tasks: Task[]): TaskRepositoryPort => ({
  findAll: async (): Promise<Task[]> => {
    return tasks
  },

  findById: async (id: number): Promise<O.Option<Task>> => {
    const filterResult = tasks.filter((task) => task.id === id)[0]
    return filterResult === undefined ? O.none : O.some(filterResult)
  },

  create: async (
    id: number,
    title: string,
    description: string
  ): Promise<E.Either<ApplicationError, Task>> => {
    const newTask = { id, title, description }
    tasks.push(newTask)
    return E.right(newTask)
  },

  update: async (
    id: number,
    title: string,
    description: string
  ): Promise<E.Either<ApplicationError, string>> => {
    const newTask = { id, title, description }
    const updatedTasks = tasks.map((task) => (task.id === id ? newTask : task))

    // Clear this array
    tasks.length = 0

    tasks.push(...updatedTasks)

    return E.right('Successfully updated!')
  },

  delete_: async (id: number): Promise<void> => {
    const deleted = tasks.filter((task) => task.id !== id)

    // Clear this array
    tasks.length = 0

    tasks.push(...deleted)
  },
})
