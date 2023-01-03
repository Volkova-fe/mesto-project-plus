import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.patch('/me', userController.updateInfo);
router.patch('/me/avatar', userController.updateAvatar);

router.get('/me', userController.getUserInfo);
export default router;
