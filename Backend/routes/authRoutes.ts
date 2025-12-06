import express from 'express';
const router = express.Router();
import authController from '../controllers/authController';

//Defined the login route
router.post('/login', authController.login);
router.post('/register', authController.createUser);
router.post('/logout', authController.logout);

export default router;
