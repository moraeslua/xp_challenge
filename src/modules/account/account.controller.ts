import { Request, Response } from 'express';
import { HttpStatus } from 'src/helpers';
import {
  IDepositRequest,
  IGetByIdRequest,
  IGetEventsRequest,
  IGetInvestmentEventsRequest,
  IGetInvestmentsRequest,
  IWithdrawRequest,
} from './interfaces/account.controller.interface';
import { IAccountService } from './interfaces/account.service.interface';

const LIMIT_DEFAULT_VALUE = 10;
const OFFSET_DEFAULT_VALUE = 0;

export class AccountController {
  constructor(private readonly accountService: IAccountService) {}

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params as unknown as IGetByIdRequest;
    const accountId = Number(id);

    if (res.locals.account?.id !== accountId) {
      return res.status(HttpStatus.UNAUTHORIZED).end();
    }

    const accountData = await this.accountService.getById({ id: accountId });

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

  public getInvestmentEvents = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { id } = req.params as unknown as Pick<
      IGetInvestmentEventsRequest,
      'id'
    >;

    const accountId = Number(id);

    if (res.locals.account?.id !== accountId) {
      return res.status(HttpStatus.UNAUTHORIZED).end();
    }

    const queries = req.query as unknown as Pick<
      IGetInvestmentEventsRequest,
      'limit' | 'offset'
    >;

    const limit = Number(queries.limit) || LIMIT_DEFAULT_VALUE;
    const offset = Number(queries.offset) || OFFSET_DEFAULT_VALUE;

    const investmentEvents = await this.accountService.getInvestmentEvents({
      accountId,
      limit,
      offset,
    });

    res.status(HttpStatus.OK).json(investmentEvents);
  };

  public getEvents = async (req: Request, res: Response) => {
    const { id } = req.params as unknown as Pick<IGetEventsRequest, 'id'>;
    const queries = req.query as unknown as Pick<
      IGetEventsRequest,
      'limit' | 'offset'
    >;

    const accountId = Number(id);
    const limit = Number(queries.limit) || LIMIT_DEFAULT_VALUE;
    const offset = Number(queries.offset) || OFFSET_DEFAULT_VALUE;

    const events = await this.accountService.getEvents({
      accountId,
      limit,
      offset,
    });

    return res.status(HttpStatus.OK).json(events);
  };
}
