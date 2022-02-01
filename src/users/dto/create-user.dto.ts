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

export class CreateUserDto {
  @ValidateNested({ each: true })
  @Type(() => CreateUserAddressDto)
  address: Array<CreateUserAddressDto>;
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
