// import * as E from 'fp-ts/Either'
// import { updateTaskController } from '../../../src/interface/controllers/updateTaskController'
// import { taskRepositoryInMemory } from '../../../src/infrastructure/repositories/taskRepositoryInMemory'
// import { missingRequiredParameterError } from '../../../src/application/errors/MissingRequiredParameterError'
// import { taskIDDoesntExistError } from '../../../src/application/errors/TaskIDDoesntExistError'

// describe('updateTaskController', () => {
//   let taskRepository: ReturnType<typeof taskRepositoryInMemory>

//   beforeEach(() => {
//     taskRepository = taskRepositoryInMemory([])
//   })

//   it('should successfully update an existing task', async () => {
//     await taskRepository.create(1, 'Old Title', 'Old Description')

//     const result = await updateTaskController(
//       { id: 1, title: 'New Title', description: 'New Description' },
//       taskRepository
//     )

//     expect(E.isRight(result)).toBe(true)
//     expect(E.getOrElse(() => '')(result)).toBe('Successfully updated!')

//     const updatedTask = await taskRepository.findById(1)
//     expect(E.isSome(updatedTask)).toBe(true)
//     if (E.isSome(updatedTask)) {
//       expect(updatedTask.value.title).toBe('New Title')
//       expect(updatedTask.value.description).toBe('New Description')
//     }
//   })

//   it('should return an error if the task ID does not exist', async () => {
//     const result = await updateTaskController(
//       { id: 999, title: 'New Title', description: 'New Description' },
//       taskRepository
//     )

//     expect(E.isLeft(result)).toBe(true)
//     expect(E.getLeft(result)).toEqual(taskIDDoesntExistError(999))
//   })

//   it('should return an error if the id is undefined', async () => {
//     const result = await updateTaskController(
//       { id: undefined, title: 'New Title', description: 'New Description' },
//       taskRepository
//     )

//     expect(E.isLeft(result)).toBe(true)
//     expect(E.getLeft(result)).toEqual(missingRequiredParameterError("'id' is undefined."))
//   })

//   it('should return an error if the title is undefined', async () => {
//     await taskRepository.create(1, 'Old Title', 'Old Description')

//     const result = await updateTaskController(
//       { id: 1, title: undefined, description: 'New Description' },
//       taskRepository
//     )

//     expect(E.isLeft(result)).toBe(true)
//     expect(E.getLeft(result)).toEqual(missingRequiredParameterError("'title' is undefined."))
//   })

//   it('should return an error if the description is undefined', async () => {
//     await taskRepository.create(1, 'Old Title', 'Old Description')

//     const result = await updateTaskController(
//       { id: 1, title: 'New Title', description: undefined },
//       taskRepository
//     )

//     expect(E.isLeft(result)).toBe(true)
//     expect(E.getLeft(result)).toEqual(missingRequiredParameterError("'description' is undefined."))
//   })
// })
