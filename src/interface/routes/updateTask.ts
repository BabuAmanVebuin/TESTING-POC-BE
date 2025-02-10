import * as E from 'fp-ts/Either'
import type { TaskRepositoryPort } from '../../application/port/repositories/TaskRepositoryPort'
import { updateTaskController } from '../../interface/controllers/updateTaskController'
import { asyncWrapper } from './util'
import type { Response, Router } from 'express'
import type { ApplicationError } from '../../application/errors'

const handleResult = (
  res: Response,
  eCreatedTask: E.Either<ApplicationError, string>
): void => {
  if (E.isRight(eCreatedTask)) {
    // Successfully updated
    res.status(204).send(JSON.stringify(eCreatedTask.right))
  } else {
    const error: ApplicationError = eCreatedTask.left
    switch (error._tag) {
      case 'MissingRequiredParameterError':
        res.status(422).send(error.message)
        break
      case 'TaskIDDoesntExistError':
        res.status(404).send(error.message)
        break
    }
  }
}

export const updateTask = (
  router: Router,
  repository: TaskRepositoryPort
): void => {
  router.patch(
    '/task',
    asyncWrapper(async (req, res) => {
      const { id, title, description } = req.body
      const eUpdatedTask = await updateTaskController(
        { id, title, description },
        repository
      )
      handleResult(res, eUpdatedTask)
    })
  )
}
