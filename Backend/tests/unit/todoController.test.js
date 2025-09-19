const todoController = require('../../controllers/todoController');
const todoModel = require('../../models/Todo');

jest.mock('../../models/Todo');

const mockUpdateTodoRequest = {
  title: 'This is for checking',
  content: 'I would like to do something very important ',
  startDate: '2025-09-16T14:00:00.000Z',
  dueDate: '2025-09-24T14:00:00.000Z',
};

const mockTodo = {
  title: 'This is for checking',
  content: 'I would like to do something very important ',
  startDate: '2025-09-16T14:00:00.000Z',
  dueDate: '2025-09-24T14:00:00.000Z',
  isDeleted: false,
  deletedAt: null,
  isCompleted: false,
  user: '68835dc6673a3afa29b41e0c',
  _id: '68cbafca6e1f0a9ba9c1c90a',
  createdAt: '2025-09-18T07:07:54.446Z',
  updatedAt: '2025-09-18T07:07:54.446Z',
  __v: 0,
};

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

describe('PUT /todos/:id', () => {
  it('Update todos sucessfully ', async () => {
    const req = {
      body: mockUpdateTodoRequest,
      user: { _id: '68835dc6673a3afa29b41e0c' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    todoModel.findOneAndUpdate.mockResolvedValue(mockTodo);
    await todoController.updateTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ todo: mockTodo });
  });
  it('update todo failed when todo not exist', async () => {
    const req = {
      body: mockUpdateTodoRequest,
      user: { _id: '68835dc6673a3afa29b41e0c' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    todoModel.findOneAndUpdate.mockResolvedValue(null);
    await todoController.updateTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Can't update a non-existing todo",
    });
  });

  it('Failed to update when todo id does not exist', async () => {
    const req = {
      body: mockUpdateTodoRequest,
      user: { _id: '68835dc6673a3afa29b41e0c' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    todoModel.findOneAndUpdate.mockResolvedValue(null);
    await todoController.updateTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Can't update a non-existing todo",
    });
  });
});
