import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDataService } from './products-data.service';
import { TagRepository } from './db/tag.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './db/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagRepository]),
    TypeOrmModule.forFeature([ProductRepository]),
  ],
  controllers: [ProductsController],
  providers: [ProductsDataService],
})
export class ProductsModule {}
