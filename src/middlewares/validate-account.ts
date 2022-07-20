import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../helpers';
import { verifyToken } from '../helpers/jwt-helpers';
import { IAccountPayload } from '../types/express';

export class ValidateAccount {
  public execute = async (req: Request, res: Response, next: NextFunction) => {
    //
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Token not found' });
    }

    try {
      const decodedPayload = verifyToken(token);
      res.locals.account = decodedPayload as IAccountPayload;

      next();
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid Token' });
    }
  };
}
