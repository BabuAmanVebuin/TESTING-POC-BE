import type * as E from 'fp-ts/Either'
import type * as O from 'fp-ts/Option'
import type { ApplicationError } from '../../errors'
import { UserDocumentDto } from '../../../domain/models/UserDocumentDto'

export type UserDocumentRepositoryPort = {
  findAll: () => Promise<UserDocumentDto[]>
  findByUserIdAndDocumentType: (
    userId: number,
    documentType: string
  ) => Promise<O.Option<UserDocumentDto>>
  create: (
    userId: number,
    documentType: string,
    documentUrl: string,
    documentStatus: string,
    issuedDate: string,
    expirationDate: string,
    issuedBy?: string,
    remarks?: string
  ) => Promise<E.Either<ApplicationError, UserDocumentDto>>
}
