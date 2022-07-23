import { Request, Response } from 'express';
import { HttpStatus } from '../../helpers';
import {
  IBuyStockRequest,
  ISellStockRequest,
} from './interfaces/investment.controller.interface';
import { IInvestmentService } from './interfaces/investment.service.interface';

export class InvestmentController {
  constructor(private investmentService: IInvestmentService) {}

  public buyStock = async (req: Request, res: Response): Promise<Response> => {
    const { accountId, assetId, amount } = req.body as IBuyStockRequest;

    if (res.locals.account?.id !== accountId) {
      return res.status(HttpStatus.UNAUTHORIZED).end();
    }

    const response = await this.investmentService.buyStock({
      accountId,
      assetId,
      amount,
    });

    return res.status(HttpStatus.CREATED).json(response);
  };

  public sellStock = async (req: Request, res: Response): Promise<Response> => {
    const { accountId, assetId, amount } = req.body as ISellStockRequest;

    if (res.locals.account?.id !== accountId) {
      return res.status(HttpStatus.UNAUTHORIZED).end();
    }

    const response = await this.investmentService.sellStock({
      accountId,
      assetId,
      amount,
    });
    return res.status(HttpStatus.CREATED).json(response);
  };
}
