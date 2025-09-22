const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const isAuth = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
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

module.exports = router;
