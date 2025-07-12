import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import BadRequestError from '../errors/bad-request-error'

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }
    try {
        console.log('Проверка upload')
        if (req.file.size < 2048) {
            return res.status(401).json({
                message: 'Слишком маленький размер файла'
            })
        }

        if (Number(req.file.size) === 5242880) {
            return res.status(401).json({
                message: 'Проблемма с метаданными'
            })
        }

        const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${uniqueFileName}`
            : `/${uniqueFileName}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file?.originalname,
        })
    } catch (error) {
        console.log('Соси ')
        return next(error)
    }
}

export default {}
