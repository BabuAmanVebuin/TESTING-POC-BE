// import { findAllTasksController } from '../../../src/interface/controllers/findAllTasksController'
// import { taskRepositoryInMemory } from '../../../src/infrastructure/repositories/taskRepositoryInMemory'
// import type { Task } from '../../../src/domain/models/Task'

// describe('findAllTasksController', () => {
//   let mockTaskRepository: ReturnType<typeof taskRepositoryInMemory>
//   let tasks: Task[]

//   beforeEach(() => {
//     tasks = [
//       { id: 1, title: 'Task 1', description: 'Description 1' },
//       { id: 2, title: 'Task 2', description: 'Description 2' },
//     ]
//     mockTaskRepository = taskRepositoryInMemory(tasks)
//   })

//   it('should return all tasks', async () => {
//     const result = await findAllTasksController(mockTaskRepository)
//     expect(result).toEqual(tasks)
//   })

//   it('should return an empty array when no tasks are available', async () => {
//     mockTaskRepository = taskRepositoryInMemory([])
//     const result = await findAllTasksController(mockTaskRepository)
//     expect(result).toEqual([])
//   })

//   it('should handle errors gracefully', async () => {
//     const errorMockTaskRepository = {
//       ...mockTaskRepository,
//       findAll: jest.fn().mockRejectedValue(new Error('Database Error')),
//     }

//     await expect(findAllTasksController(errorMockTaskRepository)).rejects.toThrow('Database Error')
//   })
// })
