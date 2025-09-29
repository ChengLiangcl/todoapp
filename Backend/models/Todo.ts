// const mongoose = require('mongoose');
import { Todo } from '../interface/Todo';
import mongoose, { Schema, Model, model } from 'mongoose';
const todoSchema: Schema<Todo> = new mongoose.Schema(
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    files: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'File',
      },
    ],
  },
  { timestamps: true }
);

const Todo: Model<Todo> = model<Todo>('Todo', todoSchema);

export default Todo;
