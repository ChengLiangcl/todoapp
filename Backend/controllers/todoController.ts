import { createTodoSchema } from '../validation/todo';
import TodoModel from '../models/TodoModel';
import { createTodoRequestBody } from '../interface/TodoInterface';
import MessageError from '../error/MessageError';
import AuthRequest from 'interface/AuthRequest';
import { cleanJoiErrorMessage } from '../util/cleanJoiErrorMessage';
import { Response } from 'express';
import { uploadTodoFile } from '../helper/fileUpload';
import { listTodoQuery } from '../interface/TodoInterface';

export const createTodo = async (
  req: AuthRequest<createTodoRequestBody>,
  res: Response
) => {
  const user = req.user;
  const { error } = createTodoSchema.validate(req.body);
  const { title, content, startDate, dueDate } = req.body;
  if (error) {
    throw new MessageError(cleanJoiErrorMessage(error.message), 400);
  }
  const todo = await TodoModel.create({
    title,
    content,
    startDate,
    dueDate,
    user: user._id,
  });
  if (!todo) throw new MessageError('Create todo failed', 400);
  const [updatedTodo, files] = await uploadTodoFile(req.files, user, todo);
  return res
    .status(201)
    .json({ todo: updatedTodo ? updatedTodo : todo, files });
};

export const listTodos = async (
  req: AuthRequest<any, listTodoQuery>,
  res: Response
) => {
  let { page = 1, limit = 12, status = '' } = req.query;
  page = Number(page) || 1;
  limit = Number(limit) || 12;
  status = String(status).toLowerCase() || '';

  const skip = (page - 1) * limit;
  const userId = req.user._id;

  const statusQueryMap = {
    ongoing: { dueDate: { $gte: new Date() }, isCompleted: false },
    overdue: { dueDate: { $lt: new Date() }, isCompleted: false },
    completed: { isCompleted: true },
  };
  const listResultQuery = statusQueryMap[status] || {};

  const [todos, total] = await Promise.all([
    TodoModel.find({ user: userId, isDeleted: false, ...listResultQuery })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('files', 'fileName url') // only required fields
      .lean(),

    TodoModel.countDocuments({
      user: userId,
      isDeleted: false,
      ...listResultQuery,
    }),
  ]);

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) - 1,
    data: todos,
  });
};

export const deleteTodo = async (req: AuthRequest, res) => {
  if (!req.params.id) throw new MessageError('Todo id is required', 400);

  const todo = await TodoModel.findOne({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!todo) throw new MessageError('Todo not found', 400);
  if (!todo.user.equals(req.user._id))
    throw new MessageError('Not authorized', 403);
  if (todo.isDeleted) throw new MessageError('Todo already deleted', 400);

  todo.isDeleted = true;
  todo.deletedAt = new Date();
  await todo.save();

  return res
    .status(200)
    .json({ message: `Deleted todo with title ${todo.title} successfully` });
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await TodoModel.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    return res.status(200).json({ todo });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id, title, content, startDate, dueDate } = req.body;
    const todo = await TodoModel.findOneAndUpdate(
      { _id: id },
      { title, content, startDate, dueDate },
      { new: true }
    );
    if (!todo)
      return res
        .status(404)
        .json({ message: "Can't update a non-existing todo" });

    return res.status(200).json({ todo });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const searchTodo = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const todos = await TodoModel.find({
      title: { $regex: title, $options: 'i' },
      content: { $regex: content, $options: 'i' },
      category: { $regex: category, $options: 'i' },
    });
    if (!todos)
      return res.status(404).json({ message: 'Todo not found', todos: [] });
    return res.status(200).json({ todos });
  } catch (error) {
    const code = error.status || 500;
    return res.status(code).json({ message: error.message || 'Server error' });
  }
};

export const completeTodo = async (req, res) => {
  const user = req.user;
  if (!req.params.id)
    return res.status(400).json({ message: 'Todo id is required' });
  try {
    const todo = await TodoModel.findOne({
      _id: req.params.id,
      isDeleted: false,
      user: user._id,
    });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    const completedTodo = await TodoModel.findByIdAndUpdate(
      { _id: req.params.id },
      { isCompleted: !todo.isCompleted },
      { new: true }
    );
    return res.status(200).json({ completedTodo });
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
};

// controllers/todoController.js
export const generateTodos = async (req, res) => {
  try {
    const userId = req.user._id; // associate todos with this user
    const todos = [];

    for (let i = 1; i <= 1000; i++) {
      todos.push({
        title: `Sample Todo #${i}`,
        content: `This is the content for todo number ${i}`,
        startDate: new Date(),
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
        isDeleted: false,
        isCompleted: false,
        user: userId,
      });
    }

    const result = await TodoModel.insertMany(todos);

    res.json({
      message: '1000 Todos generated successfully',
      insertedCount: result.length,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error generating todos', error: error.message });
  }
};

export default {
  listTodos,
  createTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
  searchTodo,
  completeTodo,
  generateTodos,
};
