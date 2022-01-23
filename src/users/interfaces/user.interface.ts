import { Roles } from '../../products/enums/roles.enum';

interface UserAddress {
  country: string;
  city: string;
  street: string;
  number: number;
  aptNumber?: number;
}

export interface User {
  address: Array<UserAddress>;
  id: string;
  name: string;
  lastName: string;
  email: string;
  birth: Date;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;
}
