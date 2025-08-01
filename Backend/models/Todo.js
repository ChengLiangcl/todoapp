const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    files: {
      type: mongoose.Schema.ObjectId,
      ref: 'File',
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
