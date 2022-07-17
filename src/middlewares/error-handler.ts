import { NextFunction, Request, Response } from 'express';
import { HttpException, HttpStatus } from '../helpers';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { status, message } = err as HttpException;
  return res
    .status(status || HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message } || 'Something went wrong');
};
