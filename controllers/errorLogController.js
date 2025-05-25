import winston from 'winston';
import ErrorObject from '../models/dist/errorModel.js';

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log' }),
        new winston.transports.Console()
    ]
});

export default function ErrorLogController(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof ErrorObject) {
        logger.error(err.toJSON());

        return res.status(err.status).json({
            error: err.ClientMessage
        });
    }

    logger.error({
        message: err.message || 'Error interno del servidor',
        endpoint: req.originalUrl,
        status: 500
    });

    res.status(500).json({ error: 'Error interno del servidor' });
}