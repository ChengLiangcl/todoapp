const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  const user = req.user;
  try {
    const { title, content, startDate, dueDate } = req.body;
    // Simple validation
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'Title and content are required' });
    }

    const todo = await Todo.create({
      title,
      content,
      startDate,
      dueDate,
      user: user._id, // store only the user ID
    });

    return res.status(201).json({ todo });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

exports.listTodos = async (req, res) => {
  try {
    let { page = 1, limit = 12 } = req.query;
    page = +page;
    limit = +limit;

    const skip = (page - 1) * limit;
    const userId = req.user._id;

    const todos = await Todo.find({ user: userId, isDeleted: false })
      .populate('user', 'name email')
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await Todo.countDocuments({ user: userId, isDeleted: false });
    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, isDeleted: false });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    if (!todo.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    todo.isDeleted = true;
    todo.deletedAt = new Date();
    await todo.save();
    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, isDeleted: false });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    return res.status(200).json({ todo });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
