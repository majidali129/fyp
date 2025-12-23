import { Request, Response, NextFunction } from 'express';
import logger from '@/lib/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Log incoming request
  logger.info(`[${req.method}] ${req.path} - IP: ${req.ip}`);

  // Capture response end
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusLevel = status >= 400 ? 'error' : status >= 300 ? 'warn' : 'info';
    
    logger.log(
      statusLevel,
      `[${req.method}] ${req.path} ${status} - ${duration}ms`
    );
  });

  next();
};

export default requestLogger;