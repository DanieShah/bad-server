import BadRequestError from '../errors/bad-request-error';
import { NextFunction, Request, Response } from 'express'

const injectionCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { query } = req;

    if ('status' in query) {
      console.log('Запрос содержит потенциально опасные параметры');
      return new BadRequestError('Запрос содержит недопустимые символы');
    }

    next()
}

export default injectionCheckMiddleware