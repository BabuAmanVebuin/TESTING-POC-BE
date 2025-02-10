import * as E from 'fp-ts/Either'
import type { TaskRepositoryPort } from '../../application/port/repositories/TaskRepositoryPort'
import { createTaskController } from '../../interface/controllers/createTaskController'
import { asyncWrapper } from './util'
import type { Response, Router } from 'express'
import type { ApplicationError } from '../../application/errors'
import type { Task } from '../../domain/models/Task'

const handleResult = (
  res: Response,
  eCreatedTask: E.Either<ApplicationError, Task>
): void => {
  if (E.isRight(eCreatedTask)) {
    // Successfully created
    res.status(201).send(JSON.stringify(eCreatedTask.right))
  } else {
    const error: ApplicationError = eCreatedTask.left
    switch (error._tag) {
      case 'MissingRequiredParameterError':
        res.status(422).send(error.message)
        break
      case 'TaskIDAlreadyExistsError':
        res.status(409).send(error.message)
        break
    }
  }
}

export const createTask = (
  router: Router,
  repository: TaskRepositoryPort
): void => {
  router.post(
    '/task',
    asyncWrapper(async (req, res) => {
      const { id, title, description } = req.body
      const eCreatedTask = await createTaskController(
        { id, title, description },
        repository
      )
      handleResult(res, eCreatedTask)
    })
  )
}
