import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IAppRequest extends Request {
  user?: {
    _id: String | JwtPayload,
  };
}
