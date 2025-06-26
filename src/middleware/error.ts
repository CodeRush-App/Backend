import { Request, Response, NextFunction } from 'express';
import ApiError from '../types/ApiError';

export default function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  const stack = process.env.NODE_ENV === 'production' ? undefined : err.stack;

  res.status(status).json({ error: message, stack });
}
