import { InvestmentController } from './investment.controller';
import express from 'express';
import { ValidateAccount } from 'src/middlewares/validate-account';

export class InvestmentRoutes {
  public routes = express.Router();
  constructor(
    protected investmentController: InvestmentController,
    protected validateAccount: ValidateAccount,
  ) {
    this.routes.post(
      '/buy',
      validateAccount.execute,
      investmentController.buyStock,
    );
    this.routes.post(
      '/sell',
      validateAccount.execute,
      investmentController.sellStock,
    );
  }
}
