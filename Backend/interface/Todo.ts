import { Document, Types } from 'mongoose';

// --- 1. Interface ---
export interface Todo extends Document {
  title: string;
  content: string;
  startDate: Date;
  dueDate: Date;
  isDeleted: boolean;
  deletedAt?: Date | null;
  isCompleted: boolean;
  user: Types.ObjectId;
  files: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
