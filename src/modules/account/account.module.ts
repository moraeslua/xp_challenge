import { PrismaClient } from '@prisma/client';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { IAccountRepository } from './interfaces/account.repository.interface';
import { IAccountService } from './interfaces/account.service.interface';
import { PrismaAccountRepository } from './repository/prisma.account.repository';

export class AccountModule {
  public accountRepository: IAccountRepository;
  private accountService: IAccountService;
  public accountController: AccountController;
  //
  constructor(client: PrismaClient) {
    this.accountRepository = new PrismaAccountRepository(client);
    this.accountService = new AccountService(this.accountRepository);
    this.accountController = new AccountController(this.accountService);
  }
}
