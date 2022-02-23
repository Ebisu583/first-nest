import { Statuses } from '../shared/enums/statuses.enum';
import { ExternalOrderedProductDto } from './external-ordered-product.dto';

export class ExternalOrderDto {
  orderedProducts: Array<ExternalOrderedProductDto>;
  addInfo: string;
  status: Statuses = Statuses.NEW_ORDER;
  user: number;
  totalPrice: number;
  userAddress: number;
}
