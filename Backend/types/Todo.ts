// types/Todo.ts
import { Types } from 'mongoose';

export type Todo = {
  _id?: string;
  title: string;
  content: string;
  startDate: Date;
  dueDate: Date;
  isDeleted: boolean;
  deletedAt?: Date | null;
  isCompleted: boolean;
  user: Types.ObjectId;
  files: Types.ObjectId[];
};
