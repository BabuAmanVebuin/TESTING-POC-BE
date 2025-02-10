// import * as E from 'fp-ts/Either'
// import { createTaskController } from './../../../src/interface/controllers/createTaskController'
// import { taskRepositoryInMemory } from './../../../src/infrastructure/repositories/taskRepositoryInMemory'
// import { missingRequiredParameterError } from '../../../src/application/errors/MissingRequiredParameterError'
// import { taskIDAlreadyExistsError } from '../../../src/application/errors/TaskIDAlreadyExistsError'

// describe('Create Task Integration Test', () => {
//   let taskRepository: ReturnType<typeof taskRepositoryInMemory>

//   beforeEach(() => {
//     taskRepository = taskRepositoryInMemory([])
//   })

//   test('should successfully create a new task', async () => {
//     const input = {
//       id: 1,
//       title: 'New Task',
//       description: 'Task description'
//     }

//     const result = await createTaskController(input, taskRepository)

//     expect(E.isRight(result)).toBe(true)
//     if (E.isRight(result)) {
//       expect(result.right).toEqual(input)
//     }
//   })

//   test('should return an error if task ID already exists', async () => {
//     const input = {
//       id: 1,
//       title: 'Existing Task',
//       description: 'Task description'
//     }

//     await taskRepository.create(input.id, input.title, input.description)

//     const result = await createTaskController(input, taskRepository)

//     expect(E.isLeft(result)).toBe(true)
//     if (E.isLeft(result)) {
//       expect(result.left).toEqual(taskIDAlreadyExistsError(input.id))
//     }
//   })

//   test('should return an error if id is undefined', async () => {
//     const input = {
//       id: undefined,
//       title: 'New Task',
//       description: 'Task description'
//     }

//     const result = await createTaskController(input, taskRepository)

//     expect(E.isLeft(result)).toBe(true)
//     if (E.isLeft(result)) {
//       expect(result.left).toEqual(missingRequiredParameterError("'id' is undefined."))
//     }
//   })

//   test('should return an error if title is undefined', async () => {
//     const input = {
//       id: 2,
//       title: undefined,
//       description: 'Task description'
//     }

//     const result = await createTaskController(input, taskRepository)

//     expect(E.isLeft(result)).toBe(true)
//     if (E.isLeft(result)) {
//       expect(result.left).toEqual(missingRequiredParameterError("'title' is undefined."))
//     }
//   })

//   test('should return an error if description is undefined', async () => {
//     const input = {
//       id: 3,
//       title: 'New Task',
//       description: undefined
//     }

//     const result = await createTaskController(input, taskRepository)

//     expect(E.isLeft(result)).toBe(true)
//     if (E.isLeft(result)) {
//       expect(result.left).toEqual(missingRequiredParameterError("'description' is undefined."))
//     }
//   })
// })
