const Todo = require('../models/Todo');
const File = require('../models/Files');

/**
 * Create a new todo item for the current user.
 * @param {Object} req.body - The request body containing the todo item details.
 * @param {Object} req.user - The current user object.
 * @returns {Promise<Object>} - A promise that resolves to a JSON object containing the created todo item.
 * @throws {Error} - If the request body is invalid or if there is an error creating the todo item.
 */
exports.createTodo = async (req, res) => {
  const user = req.user;
  try {
    const { title, content, startDate, dueDate } = req.body;
    if (!title || !content || !startDate || !dueDate) {
      return res
        .status(400)
        .json({ message: 'Title and content are required' });
    }

    const fileList = req.files['files'] || [];

    const todo = await Todo.create({
      title,
      content,
      startDate,
      dueDate,
      user: user._id, // store only the user ID
    });

    let files = [];
    if (fileList.length > 0) {
      fileList.forEach(async (file) => {
        const { path, originalname: filename, size, mimetype: fileType } = file;
        const uploadedFile = await File.create({
          filename,
          path,
          size,
          fileType,
          type: 'Todo support document',
          user: user._id,
          todo: todo._id,
        });
        files.push(uploadedFile);
      });
    }

    return res.status(201).json({ todo, files });
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
      .sort({
        createdAt: -1,
      })
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
    return res
      .status(200)
      .json({ message: `Deleted todo with title ${todo.title} successfully` });
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

exports.updateTodo = async (req, res) => {
  try {
    const { id, title, content, startDate, dueDate } = req.body;
    const todo = await Todo.findOneAndUpdate(
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
