import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  role!: string;

  @IsOptional()
  adminCode?: string;
}