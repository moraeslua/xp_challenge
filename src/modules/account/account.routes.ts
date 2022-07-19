import express from 'express';
import { AccountController } from './account.controller';

export class AccountRoutes {
  public routes = express.Router();
  constructor(protected accountController: AccountController) {
    this.routes.get('/:id', accountController.getById);
    this.routes.post('/withdraw', accountController.withdrawFromAccount);
    this.routes.post('/deposit', accountController.depositOnAccount);
  }
}
