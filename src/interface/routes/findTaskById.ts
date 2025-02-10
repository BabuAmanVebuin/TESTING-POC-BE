import * as E from 'fp-ts/Either'
import type { TaskRepositoryPort } from '../../application/port/repositories/TaskRepositoryPort'
import { findByIdTaskController } from '../../interface/controllers/findTaskByIdController'
import { asyncWrapper } from './util'
import type { Response, Router } from 'express'
import type { ApplicationError } from '../../application/errors'
import type { Task } from '../../domain/models/Task'

const handleResult = (
  res: Response,
  eFoundTask: E.Either<ApplicationError, Task>
): void => {
  if (E.isRight(eFoundTask)) {
    res.send(JSON.stringify(eFoundTask.right))
  } else {
    const error: ApplicationError = eFoundTask.left
    switch (error._tag) {
      case 'TaskIDDoesntExistError':
        res.status(404).send(error.message)
        break
    }
  }
}

export const findTaskById = (
  router: Router,
  repository: TaskRepositoryPort
): void => {
  router.get(
    '/task/:id',
    asyncWrapper(async (req, res) => {
      const id = Number(req.params['id'])
      const eFoundTask = await findByIdTaskController({ id }, repository)
      handleResult(res, eFoundTask)
    })
  )
}
