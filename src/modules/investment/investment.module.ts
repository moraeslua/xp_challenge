import { PrismaClient } from '@prisma/client';
import { IAccountRepository } from '../account/interfaces/account.repository.interface';
import { IAssetRepository } from '../asset/interfaces/asset.repository.interface';
import { IInvestimentRepository } from './interfaces/investment.repository.interface';
import { IInvestmentService } from './interfaces/investment.service.interface';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import { PrismaInvestmentRepository } from './repository/prisma.investment.repository';

export class InvestmentModule {
  private investmentRepository: IInvestimentRepository;
  private investmentService: IInvestmentService;
  public investmentController: InvestmentController;
  constructor(
    client: PrismaClient,
    accountRepository: IAccountRepository,
    assetRepository: IAssetRepository,
  ) {
    this.investmentRepository = new PrismaInvestmentRepository(client);
    this.investmentService = new InvestmentService(
      this.investmentRepository,
      assetRepository,
      accountRepository,
    );
    this.investmentController = new InvestmentController(
      this.investmentService,
    );
  }
}
