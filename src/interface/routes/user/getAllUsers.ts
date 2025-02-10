import { asyncWrapper } from '../util'
import type { Router } from 'express'
import type { UserRepositoryPort } from '../../../application/port/repositories/userRepositoryPort'
import { getAllUsersController } from '../../controllers/user/getAllUsersController'

export const getAllUsers = (
  router: Router,
  repository: UserRepositoryPort
): void => {
  router.get(
    '/users',
    asyncWrapper(async (_req, res) => {
      const foundUsers = await getAllUsersController(repository)
      res.send(JSON.stringify(foundUsers))
    })
  )
}
