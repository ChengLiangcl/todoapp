import express from 'express';
const router = express.Router();
import todoController from '../controllers/todoController';
import isAuth from '../middleware/authMiddleware';
import multer from 'multer';
import path from 'path';

// Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });
const storage = multer.memoryStorage(); // store file in memory
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) cb(null, true);
  else cb(new Error('Only images, PDFs, and Word docs are allowed'));
};

const upload = multer({ storage, fileFilter });

// Routes
router.post(
  '/',
  isAuth,
  upload.fields([
    { name: 'files', maxCount: 5 },
    { name: 'coverPhoto', maxCount: 1 },
  ]),
  todoController.createTodo
);

router.get('/', isAuth, todoController.listTodos);
router.get('/:id', isAuth, todoController.getTodoById);
router.put('/:id', isAuth, todoController.updateTodo);
router.delete('/:id', isAuth, todoController.deleteTodo);
router.put('/complete/:id', isAuth, todoController.completeTodo);
router.post('/generate-todos', isAuth, todoController.generateTodos);

export default router;
