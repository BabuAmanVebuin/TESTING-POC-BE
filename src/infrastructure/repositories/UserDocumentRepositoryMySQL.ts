import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import type { Connection } from 'typeorm'
import type { ApplicationError } from '../../application/errors'
import { UserDocument } from '../orm/typeorm/entities/UserDocument'
import { UserDocumentRepositoryPort } from '../../application/port/repositories/userDocumentRepositoryPort'

export const userDocumentRepositoryMySQL = async (
  connection: Connection
): Promise<UserDocumentRepositoryPort> => ({
  findAll: async (): Promise<UserDocument[]> => {
    const userDocumentRepository = connection.getRepository(UserDocument)
    return userDocumentRepository.find({
      relations: ['userId'],
    })
  },

  findByUserIdAndDocumentType: async (
    userId: number,
    documentType: string
  ): Promise<O.Option<UserDocument>> => {
    const userDocumentRepository = connection.getRepository(UserDocument)
    const result = await userDocumentRepository.findOne({
      where: { userId, documentType },
    })
    return result === undefined ? O.none : O.some(result)
  },

  create: async (
    userId: number,
    documentType: string,
    documentUrl: string,
    documentStatus: string,
    issuedDate: string,
    expirationDate: string,
    issuedBy?: string,
    remarks?: string
  ): Promise<E.Either<ApplicationError, UserDocument>> => {
    const userDocumentRepository = connection.getRepository(UserDocument)

    const userDocument = new UserDocument()
    userDocument.userId = userId
    userDocument.documentType = documentType
    userDocument.documentUrl = documentUrl
    userDocument.documentStatus = documentStatus
    userDocument.issuedDate = issuedDate
    userDocument.expirationDate = expirationDate
    userDocument.issuedBy = issuedBy !== undefined ? issuedBy : ''
    userDocument.remarks = remarks !== undefined ? remarks : ''

    const result = await userDocumentRepository.save(userDocument)
    console.log('UserDocument has been saved: ', userDocument)

    return E.right(result)
  },
})
