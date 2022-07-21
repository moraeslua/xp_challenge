import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpSchema {
  constructor({ email, fullName, birthDate, password }) {
    this.email = email;
    this.fullName = fullName;
    this.birthDate = birthDate;
    this.password = password;
  }

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignInSchema {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
