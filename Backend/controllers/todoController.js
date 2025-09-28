const Todo = require('../models/Todo');
const File = require('../models/Files');
const bucket = require('../configs/firebase');
const { createTodoSchema } = require('../validation/todo');
const { uploadFile } = require('../configs/firebaseUtil');
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
    return res.status(201).json({ todo: updatedTodo, files });
  } catch (error) {
    console.error(error);
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
      .populate('user')
      .populate('files')
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
    return res.status(500).json({ message: 'Server error' });
  }
};
