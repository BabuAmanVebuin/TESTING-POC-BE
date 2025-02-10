// import { findByIdTaskController } from '../../../src/interface/controllers/findTaskByIdController'
// import * as E from 'fp-ts/Either'
// import type { ApplicationError } from '../../../src/application/errors'
// import type { Task } from '../../../src/domain/models/Task'

// describe('findByIdTaskController', () => {
//   const mockTaskRepository = {
//     findById: jest.fn()
//   }

//   it('should return a task when it exists', async () => {
//     const mockTask: Task = { id: 1, title: 'Test Task', description: 'Test Description' }
//     mockTaskRepository.findById.mockResolvedValue(E.some(mockTask))

//     const result = await findByIdTaskController({ id: 1 }, mockTaskRepository)

//     expect(E.isRight(result)).toBe(true)
//     if (E.isRight(result)) {
//       expect(result.right).toEqual(mockTask)
//     }
//   })

//   it('should return an error when the task does not exist', async () => {
//     mockTaskRepository.findById.mockResolvedValue(E.none)

//     const result = await findByIdTaskController({ id: 2 }, mockTaskRepository)

//     expect(E.isLeft(result)).toBe(true)
//     if (E.isLeft(result)) {
//       expect(result.left).toBeInstanceOf(ApplicationError)
//       expect(result.left.message).toBe('Task ID does not exist') // Adjust according to your error message
//     }
//   })

//   it('should handle repository errors', async () => {
//     const mockError = new Error('Repository error')
//     mockTaskRepository.findById.mockRejectedValue(mockError)

//     const result = await findByIdTaskController({ id: 3 }, mockTaskRepository)

//     expect(E.isLeft(result)).toBe(true)
//     if (E.isLeft(result)) {
//       expect(result.left).toBeInstanceOf(ApplicationError)
//       expect(result.left.message).toBe('Unable to fetch task') // Adjust according to your error message
//     }
//   })
// })
