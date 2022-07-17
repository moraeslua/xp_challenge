import { PrismaClient } from '@prisma/client';

const seeds = [
  {
    email: 'salman@email.com',
    fullName: 'Salman Jaramillo',
    birthDate: new Date('05/03/2000'),
    hashedPassword: 'password',
    balance: 3050.6,
  },
  {
    email: 'russel@email.com',
    fullName: 'Russell Quintana',
    birthDate: new Date('06/03/2000'),
    hashedPassword: 'password',
    balance: 5080.3,
  },
  {
    email: 'yahya@email.com',
    fullName: 'Yahya Gallegos',
    birthDate: new Date('07/03/2000'),
    hashedPassword: 'password',
    balance: 3406.55,
  },
];

export class SeedAccount {
  constructor(private client: PrismaClient) {}
  async execute() {
    await this.client.account.createMany({ data: seeds, skipDuplicates: true });
  }
}
