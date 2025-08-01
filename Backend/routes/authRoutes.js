const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//Defined the login route
router.post('/login', authController.login);
router.post('/register', authController.createUser);

module.exports = router;
