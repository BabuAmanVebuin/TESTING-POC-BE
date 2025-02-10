import type { TaskRepositoryPort } from '../../application/port/repositories/TaskRepositoryPort'
import { deleteTaskController } from '../../interface/controllers/deleteTaskController'
import { asyncWrapper } from './util'
import type { Router } from 'express'

export const deleteTask = (
  router: Router,
  repository: TaskRepositoryPort
): void => {
  router.delete(
    '/task/:id',
    asyncWrapper(async (req, res) => {
      const id = Number(req.params['id'])

      await deleteTaskController({ id }, repository)
      res.send('Deleted a task')
    })
  )
}
