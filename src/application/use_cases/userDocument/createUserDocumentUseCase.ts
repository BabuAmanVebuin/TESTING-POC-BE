import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { ApplicationError } from '../../errors'
import { UserDto } from '../../../domain/models/UserDto'
import { UserRepositoryPort } from '../../port/repositories/userRepositoryPort'
import { userNotFoundError } from '../../errors/UserNotFoundError'
import { UserDocumentDto } from '../../../domain/models/UserDocumentDto'
import { UserDocumentRepositoryPort } from '../../port/repositories/userDocumentRepositoryPort'
import { userDocumentAlreadyExistsError } from '../../errors/UserDocumentAlreadyExistsError'

export const createUserDocumentUseCase = async (
  userId: number,
  documentType: string,
  documentUrl: string,
  documentStatus: string,
  issuedDate: string,
  expirationDate: string,
  userDocumentRepository: Pick<
    UserDocumentRepositoryPort,
    'create' | 'findByUserIdAndDocumentType'
  >,
  userRepository: Pick<UserRepositoryPort, 'findById'>,
  issuedBy?: string,
  remarks?: string
): Promise<E.Either<ApplicationError, UserDocumentDto>> => {
  const oExistingUser: O.Option<UserDto> = await userRepository.findById(userId)
  if (O.isNone(oExistingUser)) {
    return E.left(userNotFoundError(userId))
  }

  const oExistingUserDocument: O.Option<UserDocumentDto> = await userDocumentRepository.findByUserIdAndDocumentType(
    userId,
    documentType
  )
  if (O.isSome(oExistingUserDocument)) {
    return E.left(userDocumentAlreadyExistsError(userId, documentType))
  }

  return userDocumentRepository.create(
    userId,
    documentType,
    documentUrl,
    documentStatus,
    issuedDate,
    expirationDate,
    issuedBy,
    remarks
  )
}
