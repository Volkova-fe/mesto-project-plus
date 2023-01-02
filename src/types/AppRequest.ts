import { Request } from 'express';
import { Response, NextFunction } from 'express';

export interface IAppRequest extends Request {
  user?: {
    _id: String
  }
}

export const requestIdHandler = (req: IAppRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '63b24b4b89048d067a728b4c'
  };
  next();
};
