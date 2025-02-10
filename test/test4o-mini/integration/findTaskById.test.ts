// import { findByIdTaskController } from '../../../src/interface/controllers/findTaskByIdController'
// import { taskRepositoryInMemory } from '../../../src/infrastructure/repositories/taskRepositoryInMemory'
// import * as E from 'fp-ts/Either'
// import { taskIDDoesntExistError } from '../../../src/application/errors/TaskIDDoesntExistError'

// describe('findByIdTaskController', () => {
//   let taskRepository: ReturnType<typeof taskRepositoryInMemory>

//   beforeEach(() => {
//     taskRepository = taskRepositoryInMemory([])
//   })

//   it('should retrieve a task by ID', async () => {
//     const task = { id: 1, title: 'Test Task', description: 'This is a test task.' }
//     await taskRepository.create(task.id, task.title, task.description)

//     const result = await findByIdTaskController({ id: task.id }, taskRepository)

//     expect(E.isRight(result)).toBe(true)
//     expect(E.getOrElse(() => null)(result)).toEqual(task)
//   })

//   it('should return an error if the task does not exist', async () => {
//     const result = await findByIdTaskController({ id: 999 }, taskRepository)

//     expect(E.isLeft(result)).toBe(true)
//     expect(E.getLeft(result)).toEqual(taskIDDoesntExistError(999))
//   })
// })
