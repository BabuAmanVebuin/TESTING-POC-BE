import { UserDto } from '../../../domain/models/UserDto'
import * as O from 'fp-ts/Option'

export type UserRepositoryPort = {
  findAll: () => Promise<UserDto[]>
  findById: (id: number) => Promise<O.Option<UserDto>>
}
