import { NextFunction, Request, Response } from 'express'

const _ = require('lodash');

const savePhone = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Начало функции savePhone')
    const newPhone = _.escapeRegExp(req.body.phone)
    req.body = {
        ...req.body,
        phone: newPhone
    }
    
    console.log('Конец функции savePhone')
    next()
}

export default savePhone