import { Min, IsNotEmpty, IsNumber, IsEnum, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @Min(0)
  @IsNumber()
  price: number;
  @Min(0)
  @IsNumber()
  count: number;
  @IsArray()
  tags: Array<string>;
}
