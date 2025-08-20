import 'dotenv/config'; // automatically loads .env
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginSchema, registerSchema } from '../validation/user';
import cleanJoiErrorMessage from '../util/cleanJoiErrorMessage';
import { Response, Request } from 'express';
import { LoggedInUser, UserPartial, IUserDocument } from '../types/user';

interface LoginRequestBody {
  username: string;
  password: string;
}

export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res
        .status(400)
        .json({ error: cleanJoiErrorMessage(error.message), status: 500 });

    const { username, password } = req.body;
    const user: IUserDocument | null = await User.findOne({ username });

    if (!user || user.isDeleted) {
      return res.status(400).json({
        message: 'User does not exist',
      });
    }

    const result = await bcrypt.compare(password, user.password);

    if (result == false) {
      return res
        .status(401)
        .json({ message: 'Wrong password, please try again' });
    }

    const { _id, username: uname, email, role, isDeleted } = user.toObject();
    const userObj = { _id, username: uname, email, role, isDeleted };

    const token = jwt.sign(userObj, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      token,
      userId: user.uid,
      username: user.username,
      role: user.role,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// export const createUser = async (req, res) => {
//   try {
//     let userInfo = req.body;
//     const { error } = registerSchema.validate(userInfo);

//     if (error)
//       return res.status(400).json({ error: error.message, status: 500 });

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
//     userInfo.password = hashedPassword;
//     const user = await User.create(userInfo);
//     return res.status(201).json(user);
//   } catch (error) {
//     if (error.code === 11000) {
//       let key = Object.keys(error.keyValue)[0];
//       let value = error.keyValue[key];
//       error.message = `${key} ${value} already exists`;
//     }
//     return res.status(400).json({ message: error.message });
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     res.clearCookie('token'); // if using cookies
//     res.status(200).json({ message: 'Logout successful' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
