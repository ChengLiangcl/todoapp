import { File as MulterFile } from 'multer';
import File from '../models/Files';

import TodoModel from '../models/TodoModel';
import type { Todo } from '@dataTypes/Todo';
import { uploadFile } from '../configs/firebaseUtil';
import AuthRequest from '@datainterface/AuthRequest';
type AuthUser = AuthRequest['user'];
export const uploadTodoFile = async (
  uploadedFile: { [fieldname: string]: MulterFile[] }, // object like req.files
  user: AuthUser,
  todo: Todo
) => {
  let files = [];
  let fileIdList = [];

  if (Object.values(uploadedFile).length > 0) {
    files = await Promise.all(
      uploadedFile?.files.map(async (file: MulterFile) => {
        const { originalname: filename, size, mimetype } = file;
        let key = '';
        const filePathName =
          key === 'files'
            ? `todos/${todo._id}/${Date.now()}-${filename}`
            : `todos/${todo._id}/cover_photo/${Date.now()}-${filename}`;
        const type = key === 'files' ? 'Todo support document' : 'Cover photo';
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
    );
  }

  let updatedTodo;
  if (fileIdList.length > 0) {
    updatedTodo = await TodoModel.findByIdAndUpdate(
      todo._id,
      { $set: { files: fileIdList } },
      { new: true }
    );
  }
  return [updatedTodo, files];
};
