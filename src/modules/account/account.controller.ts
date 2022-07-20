import { Request, Response } from 'express';
import { HttpStatus } from 'src/helpers';
import {
  IDepositRequest,
  IGetByIdRequest,
  IGetInvestmentsRequest,
  IWithdrawRequest,
} from './interfaces/account.controller.interface';
import { IAccountService } from './interfaces/account.service.interface';

export class AccountController {
  constructor(private readonly accountService: IAccountService) {}

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params as unknown as IGetByIdRequest;
    const accountData = await this.accountService.getById({ id: Number(id) });
    return res.status(HttpStatus.OK).json(accountData);
  };

  public withdrawFromAccount = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { id, value } = req.body as IWithdrawRequest;
    const response = await this.accountService.withdrawFromAccount({
      id,
      value,
    });
    return res.status(HttpStatus.CREATED).json(response);
  };

  public depositOnAccount = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { id, value } = req.body as IDepositRequest;
    const response = await this.accountService.depositOnAccount({ id, value });
    return res.status(HttpStatus.CREATED).json(response);
  };

  public getInvestments = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { accountId } = req.params as unknown as IGetInvestmentsRequest;
    const response = await this.accountService.getInvestments({
      accountId: Number(accountId),
    });
    return res.status(HttpStatus.OK).json(response);
  };
}
