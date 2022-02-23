import { Statuses } from '../shared/enums/statuses.enum';
import { IsNotEmpty, ValidateNested, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderedProductDto } from './create-ordered-product.dto';

export class CreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => CreateOrderedProductDto)
  orderedProducts: Array<CreateOrderedProductDto>;
  @IsNotEmpty()
  addInfo: string;

  @IsEnum(Statuses)
  status: Statuses = Statuses.NEW_ORDER;

  @IsNotEmpty()
  userId: string;

  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  userAddressId: string;
}
