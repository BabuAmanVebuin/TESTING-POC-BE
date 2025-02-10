// import * as E from 'fp-ts/Either'
// import { updateTaskController } from '../../../src/interface/controllers/updateTaskController'
// import { taskIDDoesntExistError } from '../../../src/application/errors/TaskIDDoesntExistError'
// import { missingRequiredParameterError } from '../../../src/application/errors/MissingRequiredParameterError'

// describe('updateTaskController', () => {
//   const mockTaskRepository = {
//     update: jest.fn(),
//     findById: jest.fn(),
//   }

//   it('should return left error when id is undefined', async () => {
//     const result = await updateTaskController(
//       { id: undefined, title: 'Test', description: 'Test description' },
//       mockTaskRepository
//     )
//     expect(E.isLeft(result)).toBe(true)
//     if (E.isLeft(result)) {
//       expect(result.left).toEqual(missingRequiredParameterError("'id' is undefined."))
//     }
//   })

//   it('should return left error when title is undefined', async () => {
//     const result = await updateTaskController(
//       { id: 1, title: undefined, description: 'Test description' },
//       mockTaskRepository
//     )
//     expect(E.isLeft(result)).toBe(true)
//     if (E.isLeft(result)) {
//       expect(result.left).toEqual(missingRequiredParameterError("'title' is undefined."))
//     }
//   })

//   it('should return left error when description is undefined', async () => {
//     const result = await updateTaskController(
//       { id: 1, title: 'Test', description: undefined },
//       mockTaskRepository
//     )
//     expect(E.isLeft(result)).toBe(true)
//     if (E.isLeft(result)) {
//       expect(result.left).toEqual(missingRequiredParameterError("'description' is undefined."))
//     }
//   })

//   it('should return left error if task does not exist', async () => {
//     mockTaskRepository.findById.mockResolvedValueOnce(E.none)
//     const result = await updateTaskController(
//       { id: 1, title: 'Test', description: 'Test description' },
//       mockTaskRepository
//     )
//     expect(E.isLeft(result)).toBe(true)
//     if (E.isLeft(result)) {
//       expect(result.left).toEqual(taskIDDoesntExistError(1))
//     }
//   })

//   it('should return right success message when task is updated', async () => {
//     mockTaskRepository.findById.mockResolvedValueOnce(E.some({ id: 1, title: 'Old Title', description: 'Old description' }))
//     mockTaskRepository.update.mockResolvedValueOnce(E.right('Successfully updated!'))

//     const result = await updateTaskController(
//       { id: 1, title: 'New Title', description: 'New description' },
//       mockTaskRepository
//     )

//     expect(E.isRight(result)).toBe(true)
//     if (E.isRight(result)) {
//       expect(result.right).toEqual('Successfully updated!')
//     }
//   })
// })
