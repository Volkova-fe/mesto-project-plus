import userController from '../controllers/userController';
import { Router } from 'express';

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

export default router;