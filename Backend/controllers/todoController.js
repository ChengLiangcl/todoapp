const Todo = require('../models/Todo');
const File = require('../models/Files');
const bucket = require('../configs/firebase');
const { createTodoSchema } = require('../validation/todo');
const { uploadFile } = require('../configs/firebaseUtil');
const newrelic = require('newrelic');

exports.createTodo = async (req, res) => {
  const user = req.user;
  try {
    const { error } = createTodoSchema.validate(req.body);
    const { title, content, startDate, dueDate } = req.body;
    if (error) {
      return res
        .status(400)
        .json({ message: cleanJoiErrorMessage(error.message) });
    }

    let files = [];
    let fileIdList = [];
    const todo = await Todo.create({
      title,
      content,
      startDate,
      dueDate,
      user: user._id,
    });

    if (Object.values(req.files).length > 0) {
      files = await Promise.all(
        Object.entries(req.files).flatMap(([key, uploadFiles]) =>
          uploadFiles.map(async (file) => {
            const { originalname: filename, size, mimetype } = file;
            const filePathName =
              key === 'files'
                ? `todos/${todo._id}/${Date.now()}-${filename}`
                : `todos/${todo._id}/cover_photo/${Date.now()}-${filename}`;
            const type =
              key === 'files' ? 'Todo support document' : 'Cover photo';
            const url = await uploadFile(file, filePathName);
            const uploadedFile = await File.create({
              filename,
              path: url,
              size,
              fileType: mimetype,
              type: type,
              user: user._id,
              todo: todo._id,
            });
            fileIdList.push(uploadedFile._id);
            return uploadedFile;
          })
        )
      );
    }

    let updatedTodo;
    if (fileIdList.length > 0) {
      updatedTodo = await Todo.findByIdAndUpdate(
        todo._id,
        { $set: { files: fileIdList } },
        { new: true }
      );
    }
    return res
      .status(201)
      .json({ todo: updatedTodo ? updatedTodo : todo, files });
  } catch (error) {
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

exports.listTodos = async (req, res) => {
  try {
    let { page = 1, limit = 12, status = '' } = req.query;
    page = +page;
    limit = +limit;

    const skip = (page - 1) * limit;
    const userId = req.user._id;

    let listResultQuery;
    switch (status.toLowerCase()) {
      case 'ongoing':
        listResultQuery = {
          dueDate: { $gte: new Date() },
          isCompleted: false,
        };
        break;
      case 'overdue':
        listResultQuery = {
          dueDate: { $lt: new Date() },
          isCompleted: false,
        };
        break;
      case 'completed':
        listResultQuery = { isCompleted: true };
        break;
      default:
        listResultQuery = {};
    }

    const [todos, total] = await Promise.all([
      Todo.find({ user: userId, isDeleted: false, ...listResultQuery })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        // .populate('user', 'name email') // only required fields
        .populate('files', 'fileName url') // only required fields
        .lean(),

      Todo.countDocuments({
        user: userId,
        isDeleted: false,
        ...listResultQuery,
      }),
    ]);

    const mongoQuery = { ...listResultQuery, user: userId, isDeleted: false };

    (req.mongodbQuery = `db.todos.find(${JSON.stringify(mongoQuery)})
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('files')
      .skip(${skip})
      .limit(${limit})
      .exec()`.replace(/\s+/g, ' ')).replace(/\s+/g, ''),
      res.json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) - 1,
        data: todos,
      });
  } catch (error) {
    newrelic.noticeError(error, { location: 'listTodos' });
    return res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: 'Todo id is required' });
    const todo = await Todo.findOne({ _id: req.params.id, isDeleted: false });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    if (!todo.user.equals(req.user._id))
      return res.status(403).json({ message: 'Not authorized' });
    if (todo.isDeleted)
      return res.status(400).json({ message: 'Todo already deleted' });
    todo.isDeleted = true;
    todo.deletedAt = new Date();
    await todo.save();
    return res
      .status(200)
      .json({ message: `Deleted todo with title ${todo.title} successfully` });
  } catch (error) {
    const code = error.status || 500;
    return res.status(code).json({ message: error.message || 'Server error' });
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

exports.searchTodo = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const todos = await Todo.find({
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

exports.completeTodo = async (req, res) => {
  const user = req.user;
  if (!req.params.id)
    return res.status(400).json({ message: 'Todo id is required' });
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      isDeleted: false,
      user: user._id,
    });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    const completedTodo = await Todo.findByIdAndUpdate(
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
exports.generateTodos = async (req, res) => {
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

    const result = await Todo.insertMany(todos);

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
