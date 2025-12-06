// models/TodoModel.ts
import type { Todo } from '../types/Todo';
import mongoose, { Schema, model, Model } from 'mongoose';

const todoSchema = new Schema<Todo>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    isCompleted: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
const TodoModel: Model<Todo> =
  mongoose.models.Todo || model<Todo>('Todo', todoSchema);

export default TodoModel;
