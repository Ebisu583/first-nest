import { Injectable } from '@nestjs/common';
import { Order } from './db/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './db/order.repository';
import { OrderedProductRepository } from './db/ordered-product.repository';
import { OrderedProduct } from './db/ordered-product.entity';
import { Connection, EntityManager } from 'typeorm';
import { Product } from 'src/products/db/product.entity';
import { ProductRepository } from 'src/products/db/product.repository';
import { User } from 'src/users/db/users.entity';
import { UserAddress } from 'src/users/db/user_addresses.entity';
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
        .getCustomRepository(ProductRepository)
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
      orderedProductToSave.product = new Product();
      orderedProductToSave.product.id = item.productId;

      orderedProducts.push(
        await managerOrderedProductRepository.save(orderedProductToSave),
      );
    }
    return orderedProducts;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async updateProduct(id: string, item: UpdateProductDto): Promise<Product> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const tags: Tag[] = await this.tagRepository.findTagsByName(item.tags);
      const productToUpdate = await this.getProductById(id);

      productToUpdate.name = item.name;
      productToUpdate.price = item.price;
      productToUpdate.count = item.count;
      productToUpdate.tags = tags;

      await manager
        .getCustomRepository(ProductRepository)
        .save(productToUpdate);

      return await this.getProductById(id);
    });
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }
}
