import * as E from 'fp-ts/Either'
import { ApplicationError } from '../../../application/errors'
import { UserRepositoryPort } from '../../../application/port/repositories/userRepositoryPort'
import { missingRequiredParameterError } from '../../../application/errors/MissingRequiredParameterError'
import { createFamilyDetailUseCase } from '../../../application/use_cases/familyDetail/createFamilyDetailUseCase'
import { FamilyDetailDto } from '../../../domain/models/FamilyDetailDto'
import { FamilyDetailRepositoryPort } from '../../../application/port/repositories/familyDetailRepositoryPort'

export const createFamilyDetailController = async (
  input: {
    userId: number
    familyMemberName: string
    relation: string
    dateOfBirth: string
    gender: string
    occupation: string
    address: string
  },
  services: Pick<
    FamilyDetailRepositoryPort,
    'create' | 'findByUserIdAndRelation'
  >,
  userServices: Pick<UserRepositoryPort, 'findById'>
): Promise<E.Either<ApplicationError, FamilyDetailDto>> => {
  const {
    userId,
    familyMemberName,
    relation,
    dateOfBirth,
    gender,
    occupation,
    address,
  } = input

  // ✅ Validate required parameters
  if (!familyMemberName) {
    return E.left(
      missingRequiredParameterError(`'familyMemberName' is missing.`)
    )
  }
  if (!relation) {
    return E.left(missingRequiredParameterError(`'relation' is missing.`))
  }
  if (!dateOfBirth) {
    return E.left(missingRequiredParameterError(`'dateOfBirth' is missing.`))
  }
  if (!gender) {
    return E.left(missingRequiredParameterError(`'gender' is missing.`))
  }
  if (!occupation) {
    return E.left(missingRequiredParameterError(`'occupation' is missing.`))
  }
  if (!address) {
    return E.left(missingRequiredParameterError(`'address' is missing.`))
  }

  return createFamilyDetailUseCase(
    userId,
    familyMemberName,
    relation,
    dateOfBirth,
    gender,
    occupation,
    address,
    services,
    userServices
  )
}
