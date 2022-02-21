import { Statuses } from '../shared/enums/statuses.enum';
import { Transform, Type } from 'class-transformer';
import { arrayToDate } from '../../shared/helpers/date.helper';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class CreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => CreateOrderedProductDto)
  address: Array<CreateOrderedProductDto>;
  @IsNotEmpty()
  addInfo: string;

  @IsEnum(Statuses)
  status: Statuses = Statuses.NEW_ORDER;

  @IsNumber()
  userId: number;

  @IsNumber()
  userAddressId: number;
}

export class CreateUserAddressDto {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  @IsNumber()
  number: number;
  @IsNumber()
  aptNumber?: number;
}
