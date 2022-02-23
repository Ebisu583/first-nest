import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/products/db/product.repository';
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
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersDataService],
})
export class OrdersModule {}
