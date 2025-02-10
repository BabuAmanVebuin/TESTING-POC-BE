// import { deleteTaskController } from '../../../src/interface/controllers/deleteTaskController';
// import { deleteTaskUseCase } from '../../../src/application/use_cases/deleteTaskUseCase';
// import type { TaskRepositoryPort } from '../../../src/application/port/repositories/TaskRepositoryPort';

// describe('Delete Task Controller', () => {
//   let mockTaskRepository: Pick<TaskRepositoryPort, 'delete_'>;

//   beforeEach(() => {
//     mockTaskRepository = {
//       delete_: jest.fn().mockResolvedValue(undefined),
//     };
//   });

//   it('should successfully delete a task by ID', async () => {
//     const input = { id: 1 };

//     await deleteTaskController(input, mockTaskRepository);

//     expect(mockTaskRepository.delete_).toHaveBeenCalledWith(input.id);
//     expect(mockTaskRepository.delete_).toHaveBeenCalledTimes(1);
//   });

//   it('should handle the case when task ID does not exist', async () => {
//     mockTaskRepository.delete_ = jest.fn().mockResolvedValue(undefined);
//     const input = { id: 99 };

//     await deleteTaskController(input, mockTaskRepository);

//     expect(mockTaskRepository.delete_).toHaveBeenCalledWith(input.id);
//     expect(mockTaskRepository.delete_).toHaveBeenCalledTimes(1);
//   });

//   it('should return an error if the repository fails to delete', async () => {
//     const input = { id: 1 };
//     const error = new Error('Deletion failed');
//     mockTaskRepository.delete_ = jest.fn().mockRejectedValue(error);

//     await expect(deleteTaskController(input, mockTaskRepository)).rejects.toThrow('Deletion failed');

//     expect(mockTaskRepository.delete_).toHaveBeenCalledWith(input.id);
//     expect(mockTaskRepository.delete_).toHaveBeenCalledTimes(1);
//   });
// });
