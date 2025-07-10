import { NextFunction, Request, Response } from 'express'

const limitValidator = (req: Request, res: Response, next: NextFunction) => {
    const { limit } = req.query;
    
    if ( Number(limit) > 10 ) {
        req.query.limit = '10'
    }

    next()
}

export default limitValidator;