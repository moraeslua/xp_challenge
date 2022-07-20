import express from 'express';
import { ValidateAccount } from 'src/middlewares/validate-account';
import { AccountController } from './account.controller';

export class AccountRoutes {
  public routes = express.Router();
  constructor(
    protected accountController: AccountController,
    protected validateAccount: ValidateAccount,
  ) {
    this.routes.get('/:id', accountController.getById);
    this.routes.post(
      '/withdraw',
      validateAccount.execute,
      accountController.withdrawFromAccount,
    );
    this.routes.post(
      '/deposit',
      validateAccount.execute,
      accountController.depositOnAccount,
    );
  }
}
