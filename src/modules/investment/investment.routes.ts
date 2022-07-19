import { InvestmentController } from './investment.controller';
import express from 'express';

export class InvestmentRoutes {
  public routes = express.Router();
  constructor(protected investmentController: InvestmentController) {
    this.routes.post('/buy', investmentController.buyStock);
    this.routes.post('/sell', investmentController.sellStock);
  }
}
