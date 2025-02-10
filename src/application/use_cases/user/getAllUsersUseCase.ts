import { UserDto } from '../../../domain/models/UserDto'
import { UserRepositoryPort } from '../../port/repositories/userRepositoryPort'

export const getAllUsersUseCase = (
  userRepository: Pick<UserRepositoryPort, 'findAll'>
): Promise<UserDto[]> => {
  return userRepository.findAll()
}
