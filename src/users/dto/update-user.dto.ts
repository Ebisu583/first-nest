import { Roles } from '../../products/enums/roles.enum';

export interface UpdateUserDto {
  address: Array<UserAddress>;
  name: string;
  lastName: string;
  email: string;
  birth: Date;
  role: Roles;
}

interface UserAddress {
  country: string;
  city: string;
  street: string;
  number: number;
  aptNumber?: number;
}
