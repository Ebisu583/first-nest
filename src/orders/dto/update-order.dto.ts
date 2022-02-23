import { Statuses } from '../shared/enums/statuses.enum';
import { IsNotEmpty, ValidateNested, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateOrderedProductDto } from './update-ordered-product.dto';

export class UpdateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderedProductDto)
  orderedProducts: Array<UpdateOrderedProductDto>;
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
