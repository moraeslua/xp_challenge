import { Request, Response } from 'express';
import { AccountService } from './account.service';
import { ICreateAccountRequest } from './interfaces/controller/create-account.request';

export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  async create(req: Request, res: Response) {
    const data = req.body as ICreateAccountRequest;
    return res.status(201).json(this.accountService.create(data));
  }
}
