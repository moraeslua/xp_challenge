import { IInvestimentRepository } from '../../modules/investment/interfaces/investment.repository.interface';

export class InvestmentRepositoryMock implements IInvestimentRepository {
  findById = jest.fn();
  upsertInvestmentTransaction = jest.fn();
}
