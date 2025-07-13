import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express, { json, urlencoded, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { DB_ADDRESS } from './config'
import errorHandler from './middlewares/error-handler'
import serveStatic from './middlewares/serverStatic'
import routes from './routes'
import { rateLimit } from 'express-rate-limit'


const { PORT = 3000 } = process.env
const app = express()

app.use(cookieParser())

const allowedOrigin = 'http://localhost:5432';

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 40,
    message: 'Слишком много запросов с этого IP, попробуйте позже',
    standardHeaders: true,
    legacyHeaders: false,
  })

app.use(limiter)

// app.use(cors())
// app.use(cors({ origin: ORIGIN_ALLOW, credentials: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(serveStatic(path.join(__dirname, 'public')))

app.use(json({ limit: '10kb' }))
app.use(urlencoded({ extended: true, limit: '10kb' }))

app.options('*', cors())
app.use(routes)
app.use(errors())
app.use(errorHandler)

// eslint-disable-next-line no-console

const bootstrap = async () => {
    try {
        await mongoose.connect(DB_ADDRESS)
        await app.listen(PORT, () => console.log('ok'))
    } catch (error) {
        console.error(error)
    }
}

bootstrap()
