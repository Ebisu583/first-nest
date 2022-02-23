import { EntityRepository, Repository } from 'typeorm';
import { OrderedProduct } from './ordered-product.entity';

@EntityRepository(OrderedProduct)
export class OrderedProductRepository extends Repository<OrderedProduct> {
  public async deleteProductOrderByOrderId(orderId: string): Promise<void> {
    const orderProducts = await this.find({
      where: {
        order: orderId,
      },
    });

    await this.remove(orderProducts);
  }
}
