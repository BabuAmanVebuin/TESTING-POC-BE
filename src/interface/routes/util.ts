import type { NextFunction, Request, Response } from 'express'

export const asyncWrapper = (
  cb: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    cb(req, res, next).catch(next)
  }
}
