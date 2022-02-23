import { Injectable } from '@nestjs/common';
import { Order } from './db/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './db/order.repository';
import { OrderedProductRepository } from './db/ordered-product.repository';
import { OrderedProduct } from './db/ordered-product.entity';
import { Connection, EntityManager } from 'typeorm';
import { Product } from '../products/db/product.entity';
import { ProductRepository } from '../products/db/product.repository';
import { User } from '../users/db/users.entity';
import { UserAddress } from '../users/db/user_addresses.entity';
import { UpdateOrderedProductDto } from './dto/update-ordered-product.dto';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';

@Injectable()
export class OrdersDataService {
  constructor(
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private orderedProductRepository: OrderedProductRepository,
    private connection: Connection,
  ) {}

  async getProductsById(ids: number[]): Promise<Product[]> {
    return await this.productRepository.findByIds(ids);
  }

  async addOrder(item: CreateOrderDto): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToSave = new Order();
      orderToSave.addInfo = item.addInfo;
      orderToSave.status = item.status;
      orderToSave.user = new User();
      orderToSave.user.id = item.userId;
      orderToSave.userAddress = new UserAddress();
      orderToSave.userAddress.id = item.userAddressId;
      orderToSave.orderedProducts = await this.preparedOrderedProductsToSave(
        item.orderedProducts,
        manager.getCustomRepository(OrderedProductRepository),
      );
      return await manager
        .getCustomRepository(OrderRepository)
        .save(orderToSave);
    });
  }
  async preparedOrderedProductsToSave(
    newOrderedProducts:
      | Array<CreateOrderedProductDto>
      | Array<UpdateOrderedProductDto>,
    managerOrderedProductRepository: OrderedProductRepository,
  ): Promise<OrderedProduct[]> {
    const orderedProducts: OrderedProduct[] = [];
    for (const item of newOrderedProducts) {
      const orderedProductToSave = new OrderedProduct();

      orderedProductToSave.orderingPrice = item.orderingPrice;
      orderedProductToSave.unitAmount = item.unitAmount;
      orderedProductToSave.product = await this.productRepository.findOne(
        item.productId,
      );

      orderedProducts.push(
        await managerOrderedProductRepository.save(orderedProductToSave),
      );
    }
    return orderedProducts;
  }

  async deleteOrder(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async updateOrder(id: string, item: UpdateOrderDto): Promise<Order> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const orderToUpdate = await this.getOrderById(id);

      orderToUpdate.addInfo = item.addInfo;
      orderToUpdate.status = item.status;
      orderToUpdate.user = new User();
      orderToUpdate.user.id = item.userId;
      orderToUpdate.userAddress = new UserAddress();
      orderToUpdate.userAddress.id = item.userAddressId;
      await this.orderedProductRepository.deleteProductOrderByOrderId(id);
      orderToUpdate.orderedProducts = await this.preparedOrderedProductsToSave(
        item.orderedProducts,
        manager.getCustomRepository(OrderedProductRepository),
      );
      await manager.getCustomRepository(OrderRepository).save(orderToUpdate);

      return await this.getOrderById(id);
    });
  }

  async getOrderById(id: string): Promise<Order> {
    return await this.orderRepository.findOne(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
}
