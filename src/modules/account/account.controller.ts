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
    const accoundId = Number(id);

    if (res.locals.account?.id !== accoundId) {
      return res.status(HttpStatus.UNAUTHORIZED).end();
    }

    const accountData = await this.accountService.getById({ id: accoundId });

    return res.status(HttpStatus.OK).json(accountData);
  };

  public withdrawFromAccount = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { id, value } = req.body as IWithdrawRequest;

    if (res.locals.account.id !== id) {
      return res.status(HttpStatus.UNAUTHORIZED).end();
    }

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

    if (res.locals.account?.id !== id) {
      return res.status(HttpStatus.UNAUTHORIZED).end();
    }

    const response = await this.accountService.depositOnAccount({ id, value });
    return res.status(HttpStatus.CREATED).json(response);
  };

  public getInvestments = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { id } = req.params as unknown as IGetInvestmentsRequest;
    const accountId = Number(id);

    if (res.locals.account?.id !== accountId) {
      return res.status(HttpStatus.UNAUTHORIZED).end();
    }

    const response = await this.accountService.getInvestments({
      accountId,
    });

    return res.status(HttpStatus.OK).json(response);
  };
}
