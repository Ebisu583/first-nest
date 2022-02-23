import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderedProductDto {
  @IsNumber()
  orderingPrice: number;

  @IsNumber()
  unitAmount: number;

  @IsNotEmpty()
  productId: string;
}
