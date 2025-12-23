import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import type { Request, Response } from 'express';
import { config } from './confit';
import { globalErrorHandler } from './middlewares/globar-error-handler';

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if(!origin) return callback(null, true);

        if (config.ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
        else return callback(new Error(`CORS ERROR: Origin ${origin} not allowed by CORS`));
    },
    credentials: true
    }

const app = express();


(() => {
    app.use(cors(corsOptions)).use(cookieParser()).use(express.json()).use(express.urlencoded({ extended: true }));

    app.get('/health', (req: Request, res: Response) => {
        res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), url: req.originalUrl });
    })

    // APP ROUTES HERE

    // Global Error Handler
    app.use(globalErrorHandler)
    app.listen(config.PORT, () => {
        console.log(`Server running on port ${config.PORT}`);
    });
})()

