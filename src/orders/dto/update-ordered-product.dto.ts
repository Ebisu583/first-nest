import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderedProductDto {
  @IsNumber()
  orderingPrice: number;

  @IsNumber()
  unitAmount: number;

  @IsNotEmpty()
  productId: string;
}
