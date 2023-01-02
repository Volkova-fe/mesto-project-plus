import User from "../models/user";
import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';

class UserController {

  async createUser(req: Request, res: Response, next: NextFunction) {
    const { name, about, avatar } = req.body;

    try {
      if (!name || !about || !avatar) {
        return next(ApiError.badRequest('Переданы некорректные данные при создании пользователя'))
      }
      const user = await User.create({ name, about, avatar });
      return res.json({ data: user });
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }
}
export default new UserController();