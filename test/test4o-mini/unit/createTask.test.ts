// import * as E from 'fp-ts/Either'
// import { createTaskController } from '../../../src/interface/controllers/createTaskController'
// import { createTaskUseCase } from '../../../src/application/use_cases/createTaskUseCase'
// import { missingRequiredParameterError } from '../../../src/application/errors/MissingRequiredParameterError'
// import { taskIDAlreadyExistsError } from '../../../src/application/errors/TaskIDAlreadyExistsError'
// import type { TaskRepositoryPort } from '../../../src/application/port/repositories/TaskRepositoryPort'
// import type { Task } from '../../../src/domain/models/Task'

// jest.mock('../../../src/application/use_cases/createTaskUseCase')

// const mockCreateTaskUseCase = createTaskUseCase as jest.MockedFunction<typeof createTaskUseCase>

// describe('createTaskController', () => {
//   const mockTaskRepository: Pick<TaskRepositoryPort, 'create' | 'findById'> = {
//     create: jest.fn(),
//     findById: jest.fn(),
//   }

//   test('should return an error if id is missing', async () => {
//     const result = await createTaskController(
//       { id: undefined, title: 'Test Task', description: 'Description' },
//       mockTaskRepository
//     )
//     expect(E.isLeft(result)).toBe(true)
//     expect(result.left).toEqual(missingRequiredParameterError("'id' is undefined."))
//   })

//   test('should return an error if title is missing', async () => {
//     const result = await createTaskController(
//       { id: 1, title: undefined, description: 'Description' },
//       mockTaskRepository
//     )
//     expect(E.isLeft(result)).toBe(true)
//     expect(result.left).toEqual(missingRequiredParameterError("'title' is undefined."))
//   })

//   test('should return an error if description is missing', async () => {
//     const result = await createTaskController(
//       { id: 1, title: 'Test Task', description: undefined },
//       mockTaskRepository
//     )
//     expect(E.isLeft(result)).toBe(true)
//     expect(result.left).toEqual(missingRequiredParameterError("'description' is undefined."))
//   })

//   test('should return an error if task ID already exists', async () => {
//     mockTaskRepository.findById.mockResolvedValueOnce(E.some({ id: 1, title: 'Existing Task', description: 'Some Description' }))
//     mockCreateTaskUseCase.mockResolvedValueOnce(E.left(taskIDAlreadyExistsError(1)))

//     const result = await createTaskController(
//       { id: 1, title: 'New Task', description: 'Description' },
//       mockTaskRepository
//     )
//     expect(E.isLeft(result)).toBe(true)
//     expect(result.left).toEqual(taskIDAlreadyExistsError(1))
//   })

//   test('should successfully create a new task', async () => {
//     mockTaskRepository.findById.mockResolvedValueOnce(E.none)
//     const createdTask: Task = { id: 1, title: 'New Task', description: 'Description' }
//     mockCreateTaskUseCase.mockResolvedValueOnce(E.right(createdTask))
//     mockTaskRepository.create.mockResolvedValueOnce(E.right(createdTask))

//     const result = await createTaskController(
//       { id: 1, title: 'New Task', description: 'Description' },
//       mockTaskRepository
//     )
//     expect(E.isRight(result)).toBe(true)
//     expect(result.right).toEqual(createdTask)
//   })
// })
