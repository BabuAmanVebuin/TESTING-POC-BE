import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { FamilyDetailDto } from '../../../domain/models/FamilyDetailDto'
import { ApplicationError } from '../../errors'
import { FamilyDetailRepositoryPort } from '../../port/repositories/familyDetailRepositoryPort'
import { familyDetailAlreadyExistsError } from '../../errors/FamilyDetailsAlreadyExistsError'
import { UserDto } from '../../../domain/models/UserDto'
import { UserRepositoryPort } from '../../port/repositories/userRepositoryPort'
import { userNotFoundError } from '../../errors/UserNotFoundError'

export const createFamilyDetailUseCase = async (
  userId: number,
  familyMemberName: string,
  relation: string,
  dateOfBirth: string,
  gender: string,
  occupation: string,
  address: string,
  familyDetailRepository: Pick<
    FamilyDetailRepositoryPort,
    'create' | 'findByUserIdAndRelation'
  >,
  userRepository: Pick<UserRepositoryPort, 'findById'>
): Promise<E.Either<ApplicationError, FamilyDetailDto>> => {
  const oExistingUser: O.Option<UserDto> = await userRepository.findById(userId)
  if (O.isNone(oExistingUser)) {
    return E.left(userNotFoundError(userId))
  }

  const oExistingFamilyDetail: O.Option<FamilyDetailDto> = await familyDetailRepository.findByUserIdAndRelation(
    userId,
    relation
  )
  if (O.isSome(oExistingFamilyDetail)) {
    return E.left(familyDetailAlreadyExistsError(userId, relation))
  }

  return familyDetailRepository.create(
    userId,
    familyMemberName,
    relation,
    dateOfBirth,
    gender,
    occupation,
    address
  )
}
