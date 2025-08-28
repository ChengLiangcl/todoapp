import { Document } from 'mongoose';
export interface LoggedInUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  isDeleted: boolean;
}

export interface UserPartial {
  _id?: string;
  username?: string;
  password?: string;
  email?: string;
  isDeleted?: boolean;
  role?: string;
  deletedAt?: Date | null;
  uid?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  username: string;
  password: string;
  email: string;
  isDeleted: boolean;
  role: string;
  deletedAt: Date | null;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends Document, IUser {}
export interface AuthenticatedRequest extends Express.Request {
  user?: LoggedInUser;
}
