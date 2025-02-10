import { Response, Router } from 'express'
import * as E from 'fp-ts/Either'
import { ApplicationError } from '../../../application/errors'
import { asyncWrapper } from '../util'
import { FamilyDetailRepositoryPort } from '../../../application/port/repositories/familyDetailRepositoryPort'
import { createFamilyDetailController } from '../../controllers/familyDetail/createFamilyDetailController'
import { UserRepositoryPort } from '../../../application/port/repositories/userRepositoryPort'
import { FamilyDetailDto } from '../../../domain/models/FamilyDetailDto'

const handleResult = (
  res: Response,
  eCreatedFamilyDetail: E.Either<ApplicationError, FamilyDetailDto>
): void => {
  if (E.isRight(eCreatedFamilyDetail)) {
    res.status(201).send(JSON.stringify(eCreatedFamilyDetail.right))
  } else {
    const error: ApplicationError = eCreatedFamilyDetail.left
    switch (error._tag) {
      case 'UserNotFoundError':
        res.status(404).send(error.message)
        break
      case 'FamilyDetailAlreadyExistsError':
        res.status(409).send(error.message)
        break
      case 'MissingRequiredParameterError':
        res.status(422).send(error.message)
        break
    }
  }
}

export const createFamilyDetail = (
  router: Router,
  repository: FamilyDetailRepositoryPort,
  userRepository: UserRepositoryPort
): void => {
  router.post(
    '/family-detail',
    asyncWrapper(async (req, res) => {
      const {
        userId,
        familyMemberName,
        relation,
        dateOfBirth,
        gender,
        occupation,
        address,
      } = req.body

      const eCreatedFamilyDetail = await createFamilyDetailController(
        {
          userId,
          familyMemberName,
          relation,
          dateOfBirth,
          gender,
          occupation,
          address,
        },
        repository,
        userRepository
      )

      handleResult(res, eCreatedFamilyDetail)
    })
  )
}
