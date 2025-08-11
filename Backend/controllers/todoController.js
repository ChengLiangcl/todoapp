const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  const user = req.user;
  try {
    const { title, content, startDate, dueDate } = req.body;
    const todo = await Todo.create({
      title,
      content,
      startDate,
      dueDate,
      user,
    });

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.listAllTodosByUser = async (req, res) => {
  try {
    const userId = req.user._id; // This is the user's ObjectId

    const todos = await Todo.find({ user: userId }) // find todos with user field = userId
      .populate('user') // populate the user info if you want
      .exec();

    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
