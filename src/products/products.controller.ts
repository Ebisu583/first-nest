import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { ProductsDataService } from './products-data.service';
import { Product } from './db/product.entity';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UpdateProductDto } from './dto/update-product.dto';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { ProductsQuery } from './queries/products-query.interface';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productRepository.getProductById(_id_),
    );
  }

  @UseGuards(RoleGuard)
  @Post()
  async addProduct(
    @Body() item: CreateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productRepository.addProduct(item),
    );
  }

  @Get()
  async getAllProducts(
    @Query() query: ProductsQuery,
  ): Promise<ExternalProductDto[]> {
    return (await this.productRepository.getAllProducts(query)).map((product) =>
      this.mapProductToExternal(product),
    );
  }

  @Delete(':id')
  async deleteProductById(@Param('id') _id_: string): Promise<void> {
    this.productRepository.deleteProduct(_id_);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
    @Body() productDto: UpdateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productRepository.updateProduct(_id_, productDto),
    );
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags?.map((i) => i.name),
    };
  }
}
