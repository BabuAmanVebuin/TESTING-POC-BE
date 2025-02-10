import type * as E from 'fp-ts/Either'
import type * as O from 'fp-ts/Option'
import type { Task } from '../../../domain/models/Task'
import type { ApplicationError } from '../../errors'

export type TaskRepositoryPort = {
  findAll: () => Promise<Task[]>
  findById: (id: number) => Promise<O.Option<Task>>
  create: (
    id: number,
    title: string,
    description: string
  ) => Promise<E.Either<ApplicationError, Task>>
  update: (
    id: number,
    title: string,
    description: string
  ) => Promise<E.Either<ApplicationError, string>>
  delete_: (id: number) => Promise<void>
}
