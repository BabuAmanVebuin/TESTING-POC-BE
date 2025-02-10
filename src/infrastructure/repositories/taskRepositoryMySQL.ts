import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import type { TaskRepositoryPort } from '../../application/port/repositories/TaskRepositoryPort'
import type { Task as TaskModel } from '../../domain/models/Task'
import { Task } from '../orm/typeorm/entities/Task'
import type { Connection } from 'typeorm'
import type { ApplicationError } from '../../application/errors'

export const taskRepositoryMySQL = async (
  connection: Connection
): Promise<TaskRepositoryPort> => ({
  findAll: async (): Promise<TaskModel[]> => {
    const taskRepository = connection.getRepository(Task)
    return taskRepository.find()
  },

  findById: async (id: number): Promise<O.Option<TaskModel>> => {
    const taskRepository = connection.getRepository(Task)
    const result = await taskRepository.findOne({ where: { id } })
    return result === undefined ? O.none : O.some(result)
  },

  create: async (
    id: number,
    title: string,
    description: string
  ): Promise<E.Either<ApplicationError, Task>> => {
    const taskRepository = connection.getRepository(Task)

    const task = new Task()
    task.id = id
    task.title = title
    task.description = description

    const result = await taskRepository.save(task)
    console.log('Task has been saved: ', task)

    return E.right(result)
  },

  update: async (
    id: number,
    title: string,
    description: string
  ): Promise<E.Either<ApplicationError, string>> => {
    const taskRepository = connection.getRepository(Task)

    const task = new Task()
    task.id = id
    task.title = title
    task.description = description

    await taskRepository.save(task)

    return E.right(`Task has been updated: ${task}`)
  },

  delete_: async (id: number): Promise<void> => {
    const taskRepository = connection.getRepository(Task)
    await taskRepository.delete({ id })
  },
})
