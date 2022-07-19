import { Request, Response } from 'express';
import { HttpStatus } from 'src/helpers';
import {
  IBuyStockRequest,
  ISellStockRequest,
} from './interfaces/investment.controller.interface';
import { IInvestmentService } from './interfaces/investment.service.interface';

export class InvestmentController {
  constructor(private investmentService: IInvestmentService) {}

  public buyStock = async (req: Request, res: Response): Promise<Response> => {
    const { accountId, assetId, amount } = req.body as IBuyStockRequest;
    const response = await this.investmentService.buyStock({
      accountId,
      assetId,
      amount,
    });

    return res.status(HttpStatus.CREATED).json(response);
  };

  public sellStock = async (req: Request, res: Response): Promise<Response> => {
    const { accountId, assetId, amount } = req.body as ISellStockRequest;
    const response = await this.investmentService.sellStock({
      accountId,
      assetId,
      amount,
    });
    return res.status(HttpStatus.CREATED).json(response);
  };
}
