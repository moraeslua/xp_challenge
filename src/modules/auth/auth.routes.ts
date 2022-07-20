import { AuthController } from './auth.controller';
import express from 'express';

export class AuthRoutes {
  public routes = express.Router();
  constructor(protected authController: AuthController) {
    this.routes.post('/signup', this.authController.signUp);
    this.routes.post('/signin', authController.signIn);
  }
}
