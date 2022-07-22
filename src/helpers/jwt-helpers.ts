import { SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

const jwtConfig: SignOptions = {
  expiresIn: '25m',
  algorithm: 'HS256',
};

export const generateToken = (payload: object): string =>
  jwt.sign(payload, SECRET, jwtConfig);

export const verifyToken = (token: string) => jwt.verify(token, SECRET);
