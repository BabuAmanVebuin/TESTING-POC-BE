import { Response, Router } from 'express'
import * as E from 'fp-ts/Either'
import { ApplicationError } from '../../../application/errors'
import { asyncWrapper } from '../util'
import { UserRepositoryPort } from '../../../application/port/repositories/userRepositoryPort'
import { UserDocumentRepositoryPort } from '../../../application/port/repositories/userDocumentRepositoryPort'
import { createUserDocumentController } from '../../controllers/userDocument/createUserDocumentController'
import { UserDocumentDto } from '../../../domain/models/UserDocumentDto'

const handleResult = (
  res: Response,
  eCreateUserDocument: E.Either<ApplicationError, UserDocumentDto>
): void => {
  if (E.isRight(eCreateUserDocument)) {
    res.status(201).send(JSON.stringify(eCreateUserDocument.right))
  } else {
    const error: ApplicationError = eCreateUserDocument.left
    switch (error._tag) {
      case 'UserNotFoundError':
        res.status(404).send(error.message)
        break
      case 'UserDocumentAlreadyExistsError':
        res.status(409).send(error.message)
        break
      case 'MissingRequiredParameterError':
        res.status(422).send(error.message)
        break
    }
  }
}

export const createUserDocument = (
  router: Router,
  repository: UserDocumentRepositoryPort,
  userRepository: UserRepositoryPort
): void => {
  router.post(
    '/user-document',
    asyncWrapper(async (req, res) => {
      const {
        userId,
        documentType,
        documentUrl,
        documentStatus,
        issuedDate,
        issuedBy,
        expirationDate,
        remarks,
      } = req.body

      const eCreateUserDocument = await createUserDocumentController(
        {
          userId,
          documentType,
          documentUrl,
          documentStatus,
          issuedDate,
          issuedBy,
          expirationDate,
          remarks,
        },
        repository,
        userRepository
      )

      handleResult(res, eCreateUserDocument)
    })
  )
}
