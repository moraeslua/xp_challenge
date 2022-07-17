import express from 'express';
import { AccountController } from './account.controller';

export class AccountRoutes {
  public routes = express.Router();
  constructor(private accountController: AccountController) {}
}
