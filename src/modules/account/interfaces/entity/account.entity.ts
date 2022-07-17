export class IAccount {
  id: number;
  email: string;
  fullName: string;
  birthDate: Date;
  hashedPassword?: string;
  balance: number;
}
