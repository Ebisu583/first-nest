import { Roles } from 'src/shared/enums/roles.enum';

export interface UsersQuery {
  name?: string;
  lastName?: string;
  email?: string;
  emailFilterType?: TextFilterType;
  minDate?: string;
  maxDate?: string;
  role?: Roles;
  sortField?: string;
  orderDirection?: 'DESC' | 'ASC';
}
export enum TextFilterType {
  EQUALS = 'EQUALS',
  CONTAINS = 'CONTAINS',
}
