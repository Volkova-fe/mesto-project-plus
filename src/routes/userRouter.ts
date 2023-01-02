import userController from '../controllers/userController';
import { Router } from 'express';

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

export default router;