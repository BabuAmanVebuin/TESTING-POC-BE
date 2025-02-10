import * as E from 'fp-ts/Either'
import { ApplicationError } from '../../../application/errors'
import { UserRepositoryPort } from '../../../application/port/repositories/userRepositoryPort'
import { missingRequiredParameterError } from '../../../application/errors/MissingRequiredParameterError'
import { createUserDocumentUseCase } from '../../../application/use_cases/userDocument/createUserDocumentUseCase'
import { UserDocumentRepositoryPort } from '../../../application/port/repositories/userDocumentRepositoryPort'
import { UserDocumentDto } from '../../../domain/models/UserDocumentDto'

export const createUserDocumentController = async (
  input: {
    userId: number
    documentType: string
    documentUrl: string
    documentStatus: string
    issuedDate: string
    expirationDate: string
    issuedBy?: string
    remarks?: string
  },
  services: Pick<
    UserDocumentRepositoryPort,
    'create' | 'findByUserIdAndDocumentType'
  >,
  userServices: Pick<UserRepositoryPort, 'findById'>
): Promise<E.Either<ApplicationError, UserDocumentDto>> => {
  const {
    userId,
    documentType,
    documentUrl,
    documentStatus,
    issuedDate,
    expirationDate,
    issuedBy,
    remarks,
  } = input

  // ✅ Validate required parameters
  if (!documentType) {
    return E.left(missingRequiredParameterError(`'documentType' is missing.`))
  }
  if (!documentUrl) {
    return E.left(missingRequiredParameterError(`'documentUrl' is missing.`))
  }
  if (!documentStatus) {
    return E.left(missingRequiredParameterError(`'documentStatus' is missing.`))
  }
  if (!issuedDate) {
    return E.left(missingRequiredParameterError(`'issuedDate' is missing.`))
  }

  return createUserDocumentUseCase(
    userId,
    documentType,
    documentUrl,
    documentStatus,
    issuedDate,
    expirationDate,
    services,
    userServices,
    issuedBy,
    remarks
  )
}
