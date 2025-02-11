import * as O from 'fp-ts/Option'
import type { Connection } from 'typeorm'
import { User } from '../orm/typeorm/entities/User'
import { UserRepositoryPort } from '../../application/port/repositories/userRepositoryPort'
import { UserDto } from '../../domain/models/UserDto'

export const userRepositoryMySQL = async (
  connection: Connection
): Promise<UserRepositoryPort> => ({
  findAll: async (): Promise<UserDto[]> => {
    const userRepository = connection.getRepository(User)
    return userRepository.find({
      relations: ['familyDetails', 'userDocument', 'paymentRecords'],
    })
  },
  findById: async (id: number): Promise<O.Option<UserDto>> => {
    const userRepository = connection.getRepository(User)
    try {
      const result = await userRepository.findOne({
        where: { id },
      })
      const userOption = O.fromNullable(result)
      return userOption
    } catch (error) {
      return O.none
    }
  },
})
