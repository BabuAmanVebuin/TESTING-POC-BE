import type { TaskRepositoryPort } from '../../application/port/repositories/TaskRepositoryPort'
import { findAllTasksController } from '../../interface/controllers/findAllTasksController'
import { asyncWrapper } from './util'
import type { Router } from 'express'

export const findAllTasks = (
  router: Router,
  repository: TaskRepositoryPort
): void => {
  router.get(
    '/tasks',
    asyncWrapper(async (_req, res) => {
      const foundTasks = await findAllTasksController(repository)
      res.send(JSON.stringify(foundTasks))
    })
  )
}
