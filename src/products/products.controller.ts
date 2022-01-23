import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { ProductsDataService } from './products-data.service';
import { Product } from './interfaces/product.interface';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  getProductById(@Param('id') _id_: string): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.getItemById(_id_));
  }

  @Post()
  addProduct(@Body() _product_: CreateProductDto): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.addItem(_product_));
  }

  @Get()
  getAllProducts(): Array<ExternalProductDto> {
    return this.productRepository
      .getAllItems()
      .map((product) => this.mapProductToExternal(product));
  }

  @Delete(':id')
  deleteProductById(@Param('id') _id_: string): void {
    this.productRepository.deleteItem(_id_);
  }

  @Put(':id')
  updateProduct(
    @Param('id') _id_: string,
    @Body() productDto: UpdateProductDto,
  ): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.updateItem(_id_, productDto),
    );
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }
}
