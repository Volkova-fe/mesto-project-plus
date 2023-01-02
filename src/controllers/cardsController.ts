import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import Card from "../models/card";
import { IAppRequest } from '../types/AppRequest';

class CardController {

  async createCard(req: IAppRequest, res: Response, next: NextFunction) {
    const { name, link } = req.body;
    const owner = req.user!._id;

    try {
      if (!name || !link) {
        return next(ApiError.badRequest('Переданы некорректные данные при создании карточки'))
      }
      const user = await Card.create({ name, link, owner });
      return res.json({ data: user });
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }

  async getAllCards(req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await Card.find({});
      return res.json({ data: cards });
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }

  async removeCard(req: IAppRequest, res: Response, next: NextFunction) {
    const { cardId } = req.params;

    try {
      let card = await Card.findById(cardId);
      if (!card) {
        return next(ApiError.authorization('Карточка с указанным _id не найдена'))
      }
      card = await Card.findByIdAndRemove(cardId);
      return res.json({ data: card });
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }

  async likeCard(req: IAppRequest, res: Response, next: NextFunction) {
    const { cardId } = req.params;
    const id = req.user!._id;

    try {
      if (!cardId) {
        return next(ApiError.badRequest('Переданы некорректные данные для постановки лайка'))
      }
      const card = await Card.findByIdAndUpdate(cardId, { $addToSet: { likes: id } }, { new: true, runValidators: true });;
      if (!card) {
        return next(ApiError.authorization('Передан несуществующий _id карточки'))
      }
      return res.json({ data: card });
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }

  async dislikeCard(req: IAppRequest, res: Response, next: NextFunction) {
    const { cardId } = req.params;
    const id = req.user!._id;

    try {
      if (!cardId) {
        return next(ApiError.badRequest('Переданы некорректные данные для постановки лайка'))
      }
      const card = await Card.findByIdAndUpdate(cardId,  { $pull: { likes: id } }, { new: true, runValidators: true });;
      if (!card) {
        return next(ApiError.authorization('Передан несуществующий _id карточки'))
      }
      return res.json({ data: card });
    } catch (err: any) {
      next(ApiError.internal(err.message));
    }
  }
}
export default new CardController();