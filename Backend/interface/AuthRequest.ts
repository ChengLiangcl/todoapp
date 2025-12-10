import { Request } from 'express';
import type { Role } from '@dataTypes/Role';
import type { File as MulterFile } from 'multer';

interface AuthRequest<T = any, Q = any> extends Request {
  body: T;
  user: {
    _id: string;
    uid: string;
    username: string;
    role: Role[];
    email: string;
  };
  files?: {
    [fieldname: string]: MulterFile[];
  };
  parms?: T;
}

export default AuthRequest;
