import { Roles } from '../../shared/enums/roles.enum';

export interface ExternalUserDto {
  address?: Array<UserAddress>;
  id: string;
  name: string;
  lastName: string;
  email: string;
  birth: Array<number>;
  role: Roles;
  createdAt: Array<number>;
  updatedAt: Array<number>;
}

interface UserAddress {
  country: string;
  city: string;
  street: string;
  number: number;
  aptNumber?: number;
}
