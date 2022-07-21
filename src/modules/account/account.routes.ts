import express from 'express';
import { ValidateAccount } from 'src/middlewares/validate-account';
import { AccountController } from './account.controller';

export class AccountRoutes {
  public routes = express.Router();
  constructor(
    protected accountController: AccountController,
    protected validateAccount: ValidateAccount,
  ) {
    this.routes.get('/:id', validateAccount.execute, accountController.getById);
    this.routes.post(
      '/:id/withdraw',
      validateAccount.execute,
      accountController.withdrawFromAccount,
    );
    this.routes.post(
      '/:id/deposit',
      validateAccount.execute,
      accountController.depositOnAccount,
    );
    this.routes.get(
      '/:id/investments',
      validateAccount.execute,
      accountController.getInvestments,
    );
    // this.routes.get('/:id/extract'); get account events and investment events
  }
}
