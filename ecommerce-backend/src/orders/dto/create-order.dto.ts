import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  customerEmail!: string;

  @IsNotEmpty()
  productName!: string;

  @IsNumber()
  price!: number;
}