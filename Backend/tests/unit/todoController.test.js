// const todoController = require('../../controllers/todoController');
// const todoModel = require('../../models/Todo');

// jest.mock('../../models/Todo');

// describe('GET /todos', () => {
//   it('should return a list of todos by target user', async () => {});
//   const mockTodos = [
//     {
//       title: 'asdasdasd',
//       content: 'asdasddsadasadda',
//       startDate: new Date('2025-07-27T14:00:00.000Z'),
//       dueDate: new Date('2025-07-27T14:00:00.000Z'),
//       isCompleted: false,
//       createdAt: new Date('2025-07-28T12:11:10.443Z'),
//       updatedAt: new Date('2025-07-28T12:11:10.443Z'),
//     },
//   ];

//   const mockQuery = () => ({
//     populate: jest.fn().mockReturnThis(),
//     exec: jest.fn().mockResolvedValue(mockTodos),
//   });

//   it('should return a list of todos by target user', async () => {
//     const req = { user: { _id: '2a3e5061-95bb-4f' } };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     todoModel.find.mockReturnValue(mockQuery());
//     await todoController.listTodos(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(mockTodos);
//   });

//   it('Should return status 500 when user is none', async () => {
//     const req = { user: { _id: '-95bb-4f' } };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     todoModel.find.mockReturnValue(mockQuery());
//     await todoController.listTodos(req, res);
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       message: "Cannot read properties of undefined (reading '_id')",
//     });
//   });
// });
