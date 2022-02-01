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
import { User } from '../db/users.entity';

export class UpdateUserDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateUserAddressDto)
  address: Array<UpdateUserAddressDto>;
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

export class UpdateUserAddressDto {
  @IsNotEmpty()
  id: string;
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
  // user: UpdateUserDto;
}
