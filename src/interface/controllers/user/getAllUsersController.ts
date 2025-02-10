import { UserRepositoryPort } from '../../../application/port/repositories/userRepositoryPort'
import { getAllUsersUseCase } from '../../../application/use_cases/user/getAllUsersUseCase'
import { UserDto } from '../../../domain/models/UserDto'

export const getAllUsersController = async (
  services: Pick<UserRepositoryPort, 'findAll'>
): Promise<UserDto[]> => {
  return getAllUsersUseCase(services)
}
