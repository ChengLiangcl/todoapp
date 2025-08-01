const express = require('express');

const router = express.Router();
const isAuth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
router.get('/users', isAuth, userController.getAllUsers);
// router.post('/create-user', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
