import { EntityRepository, Repository } from 'typeorm';
import { OrderedProduct } from './ordered-product.entity';

@EntityRepository(OrderedProduct)
export class OrderedProductRepository extends Repository<OrderedProduct> {}
