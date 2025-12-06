import express from 'express';

const router = express.Router();
import isAuth from '../middleware/authMiddleware';
import userController from '../controllers/userController';
router.get('/users', isAuth, userController.getAllUsers);
// router.post('/users', userController.);
router.delete('/:id', userController.deleteUser);

export default router;
