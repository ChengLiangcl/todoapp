const express = require('express');

const router = express.Router();
const todoController = require('../controllers/todoController');
const isAuth = require('../middleware/authMiddleware');
router.post('/', isAuth, todoController.createTodo);
router.get('/', isAuth, todoController.listTodos);
router.delete('/:id', isAuth, todoController.deleteTodo);
router.get('/:id', isAuth, todoController.getTodoById);
module.exports = router;
