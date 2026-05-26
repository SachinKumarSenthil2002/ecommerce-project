import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}