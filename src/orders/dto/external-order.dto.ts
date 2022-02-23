import { Statuses } from '../shared/enums/statuses.enum';
import { ExternalOrderedProductDto } from './external-ordered-product.dto';

export class ExternalOrderDto {
  id: string;
  orderedProducts: Array<ExternalOrderedProductDto>;
  addInfo: string;
  status: Statuses;
  user: string;
  totalPrice: number;
  userAddress: string;
  createdAt: Array<number>;
  updatedAt: Array<number>;
}
