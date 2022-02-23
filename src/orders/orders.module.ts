import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository, OrderedProductRepository]),
  ],
  controllers: [OrdersController],
  providers: [OrderDataService]
})
export class OrdersModule {}
