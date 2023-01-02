import ApiError from "../error/ApiError"
import { Errback, NextFunction, Request, Response } from 'express';

export default function (err: Errback, req: Request, res: Response, next: NextFunction) {
	if(err instanceof ApiError) {
		return res.status(err.status).json({message: err.message})
	}
	return res.status(500).json({message: 'Непредвиденная ошибка'})
}