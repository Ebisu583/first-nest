import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/products/db/product.repository';
import { TagRepository } from 'src/products/db/tag.repository';
import { ProductsDataService } from 'src/products/products-data.service';
import { OrderRepository } from './db/order.repository';
import { OrderedProductRepository } from './db/ordered-product.repository';
import { OrdersDataService } from './orders-data.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderedProductRepository,
      ProductRepository,
      TagRepository,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersDataService, ProductsDataService],
})
export class OrdersModule {}
