import { Roles } from '../../shared/enums/roles.enum';
import { Transform, Type } from 'class-transformer';
import { arrayToDate } from '../../shared/helpers/date.helper';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class UpdateUserDto {
  @ValidateNested({ each: true })
  @Type(() => UserAddress)
  address: Array<UserAddress>;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Transform((d) => arrayToDate(<any>d))
  birth: Date;
  @IsEnum(Roles)
  role: Roles;
}

class UserAddress {
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
