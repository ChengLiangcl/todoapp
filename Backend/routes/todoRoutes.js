const express = require('express');

const router = express.Router();
const todoController = require('../controllers/todoController');
const isAuth = require('../middleware/authMiddleware');
router.post('/', isAuth, todoController.createTodo);
router.get('/', isAuth, todoController.listAllTodosByUser);

module.exports = router;
