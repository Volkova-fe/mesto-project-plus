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

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find({});
      return res.json({ data: users });
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const users = await User.findById(id);
      if (!users) {
        return next(ApiError.authorization('Пользователь по указанному _id не найден'))
      }
      return res.json({ data: users });
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }

  async updateInfo(req: any, res: Response, next: NextFunction) {
    const { name, about } = req.body;
    const id = req.user!._id
    try {
      if (!name || !about) {
        return next(ApiError.badRequest('Переданы некорректные данные при обновлении профиля'))
      }
      const users = await User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true });
      if (!users) {
        return next(ApiError.authorization('Пользователь по указанному _id не найден'))
      }
      return res.json({ data: users });
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }

  async updateAvatar(req: any, res: Response, next: NextFunction) {
    const { avatar } = req.body;
    const id = req.user!._id
    try {
      if (!avatar) {
        return next(ApiError.badRequest('Переданы некорректные данные при обновлении аватара'))
      }
      const users = await User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true });
      if (!users) {
        return next(ApiError.authorization('Пользователь по указанному _id не найден'))
      }
      return res.json({ data: users });
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }
}
export default new UserController();