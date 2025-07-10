import { NextFunction, Request, Response } from 'express'

const injectionCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { query } = req;

    if ('status' in query) {
      console.log('Запрос содержит потенциально опасные параметры');
      return res.status(400).send('Неверный запрос');
    }

    next()
}

export default injectionCheckMiddleware