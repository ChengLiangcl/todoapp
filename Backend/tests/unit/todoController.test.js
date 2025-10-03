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

describe('GET /todos', () => {
  let req;
  let res;
  let todoFindMockFn;
  let mockTodos;
  beforeEach(() => {
    mockTodos = [
      {
        _id: '68d61d342a32bb555829e1fa',
        title: 'this is for checking ',
        content: 'i would like to check it on purpose ',
        startDate: '2025-09-26T15:04:05.000Z',
        dueDate: '2025-09-27T15:04:05.000Z',
        isDeleted: true,
        deletedAt: '2025-09-29T11:01:27.904Z',
        isCompleted: true,
        user: '68835dc6673a3afa29b41e0c',
        files: ['68d61d362a32bb555829e1fc', '68d61d362a32bb555829e1fe'],
        createdAt: '2025-09-26T04:57:24.600Z',
        updatedAt: '2025-09-29T11:01:27.904Z',
        __v: 0,
      },
      {
        _id: {
          $oid: '68d8a24c870d63d7fdfc71fd',
        },
        title: 'i want to test it ',
        content: 'this is for checking ',
        startDate: {
          $date: '2025-09-28T20:30:29.000Z',
        },
        dueDate: {
          $date: '2025-09-29T20:30:30.000Z',
        },
        isDeleted: true,
        deletedAt: {
          $date: '2025-09-29T11:01:25.302Z',
        },
        isCompleted: true,
        user: {
          $oid: '68835dc6673a3afa29b41e0c',
        },
        files: [
          {
            $oid: '68d8a24f870d63d7fdfc71ff',
          },
          {
            $oid: '68d8a24f870d63d7fdfc7201',
          },
        ],
        createdAt: {
          $date: '2025-09-28T02:49:48.987Z',
        },
        updatedAt: {
          $date: '2025-09-29T11:01:25.303Z',
        },
        __v: 0,
      },
    ];
    req = {
      user: { _id: '68835dc6673a3afa29b41e0c' },
      query: { page: '1', limit: '2' },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    todoFindMockFn = todoModel.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue(mockTodos),
    });
    jest.clearAllMocks();
  });

  it('should return paginated todos corretly', async () => {
    const mockTotal = 5;
    todoFindMockFn();
    todoModel.estimatedDocumentCount.mockResolvedValue(mockTotal);
    await todoController.listTodos(req, res);
    expect(todoModel.find).toHaveBeenCalledWith({
      user: '68835dc6673a3afa29b41e0c',
      isDeleted: false,
    });
    expect(todoModel.estimatedDocumentCount).toHaveBeenCalledWith({
      user: '68835dc6673a3afa29b41e0c',
      isDeleted: false,
    });

    expect(res.json).toHaveBeenCalledWith({
      page: 1,
      limit: 2,
      total: mockTotal,
      totalPages: Math.ceil(mockTotal / 2) - 1,
      data: mockTodos,
    });
  });

  it('should handle errors', async () => {
    const errorMessage = 'Database error';
    todoModel.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockRejectedValue(new Error(errorMessage)),
    });

    await todoController.listTodos(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Server error: ' + errorMessage,
    });
  });
});
describe('PUT /todos/:id', () => {
  let req, res;
  beforeAll(() => {
    req = {
      body: mockUpdateTodoRequest,
      user: { _id: '68835dc6673a3afa29b41e0c' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Update todos sucessfully ', async () => {
    todoModel.findOneAndUpdate.mockResolvedValue(mockTodo);
    await todoController.updateTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ todo: mockTodo });
  });
  it('update todo failed when todo not exist', async () => {
    todoModel.findOneAndUpdate.mockResolvedValue(null);
    await todoController.updateTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Can't update a non-existing todo",
    });
  });

  it('Failed to update when todo id does not exist', async () => {
    todoModel.findOneAndUpdate.mockResolvedValue(null);
    await todoController.updateTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Can't update a non-existing todo",
    });
  });
  it('should return 500 when there is a server error', async () => {
    const mockError = new Error('Server error');
    mockError.status = 500;
    todoModel.findOneAndUpdate.mockRejectedValue(mockError);
    await todoController.updateTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
  });
});

describe('POST /complete/:id', () => {
  let req, res;
  beforeEach(() => {
    req = {
      body: mockUpdateTodoRequest,
      user: { _id: '68835dc6673a3afa29b41e0c' },
      params: { id: '66cbafca6e1f0a9ba9c1c90a' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });
  it('Try to complete a todo but todo id has not been passed from URL', async () => {
    req.params.id = null;
    await todoController.completeTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Todo id is required' });
  });
  it('Try to complete a todo but todo does not exist', async () => {
    todoModel.findOne.mockResolvedValue(null);
    await todoController.completeTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Todo not found' });
  });

  it('Complete a todo successfully', async () => {
    todoModel.findOne.mockResolvedValue(mockTodo);
    const updatedTodo = { ...mockTodo, isCompleted: true };
    todoModel.findByIdAndUpdate.mockResolvedValue(updatedTodo);
    await todoController.completeTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ completedTodo: updatedTodo });
  });
  it('should return 500 when there is a server error', async () => {
    const mockError = new Error('Database failure');
    mockError.status = 500;
    todoModel.findOne.mockRejectedValue(mockError);
    await todoController.completeTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
  });
});

describe('GET /todos/:id', () => {
  let req, res;
  beforeEach(() => {
    req = {
      params: { id: '66cbafca6e1f0a9ba9c1c90a' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });
  it('It should return 404 when the todo does not exist or the todo does not belong to current ', async () => {
    todoModel.findOne.mockResolvedValue(null);
    await todoController.getTodoById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Todo not found' });
  });
  it('It should return the todo when the todo exists and belongs to current user', async () => {
    todoModel.findOne.mockResolvedValue(mockTodo);
    await todoController.getTodoById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ todo: mockTodo });
  });
  it('It should return the error message when error happens', async () => {
    const mockError = new Error('Server error');
    mockError.status = 500;
    todoModel.findOne.mockRejectedValue(mockError);
    await todoController.getTodoById(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

describe('Delete /todos/:id', () => {
  let mockTodo;
  beforeEach(() => {
    req = {
      params: { id: '66cbafca6e1f0a9ba9c1c90a' },
      user: { _id: '68835dc6673a3afa29b41e0c' },
    };
    todo = {
      user: { equals: jest.fn() },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockTodo = {
      user: { equals: jest.fn().mockReturnValue(false) }, // <--- important fix
      isDeleted: false,
      title: 'Test todo item 1',
      save: jest.fn(),
    };

    jest.clearAllMocks();
  });
  it('It should return 400 when the request does not include id', async () => {
    req.params.id = null;
    await todoController.deleteTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Todo id is required' });
  });
  it('Todo does not exist', async () => {
    todoModel.findOne.mockResolvedValue(null);
    await todoController.deleteTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Todo not found' });
  });
  it("The id exists but the todo doesn't belong to current user", async () => {
    todoModel.findOne.mockResolvedValue(mockTodo);
    await todoController.deleteTodo(req, res);
    expect(mockTodo.user.equals).toHaveBeenCalledWith(req.user._id);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized' });
  });
  it('The todo has already been deleted', async () => {
    mockTodo.user.equals = jest.fn().mockReturnValue(true);
    mockTodo.isDeleted = true;
    todoModel.findOne.mockResolvedValue(mockTodo);
    await todoController.deleteTodo(req, res);
    expect(mockTodo.user.equals).toHaveBeenCalledWith(req.user._id);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Todo already deleted' });
  });
  it('Delete the todo successfully', async () => {
    mockTodo.user.equals = jest.fn().mockReturnValue(true);
    todoModel.findOne.mockResolvedValue(mockTodo);
    await todoController.deleteTodo(req, res);
    expect(mockTodo.user.equals).toHaveBeenCalledWith(req.user._id);
    expect(mockTodo.isDeleted).toBe(true);
    expect(mockTodo.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockTodo.deletedAt).not.toBeNull();
    expect(res.json).toHaveBeenCalledWith({
      message: 'Deleted todo with title Test todo item 1 successfully',
    });
  });
  it('It should return the error message when error happens', async () => {
    const mockError = new Error('Server error');
    mockError.status = 500;
    todoModel.findOne.mockRejectedValue(mockError);
    await todoController.deleteTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});
