import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ExternalOrderDto } from './dto/external-order.dto';
import { OrdersDataService } from './orders-data.service';
import { Order } from './db/order.entity';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { ExternalOrderedProductDto } from './dto/external-ordered-product.dto';
import { OrderedProduct } from './db/ordered-product.entity';
import { ProductsDataService } from 'src/products/products-data.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private orderRepository: OrdersDataService,
    private productRepository: ProductsDataService,
  ) {}

  @Get(':id')
  async getOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderRepository.getOrderById(_id_),
    );
  }

  @Post()
  async addOrder(@Body() _order_: CreateOrderDto): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderRepository.addOrder(_order_),
    );
  }

  @Get()
  async getAllOrders(): Promise<Array<ExternalOrderDto>> {
    return (await this.orderRepository.getAllOrders()).map((order) =>
      this.mapOrderToExternal(order),
    );
  }

  @Delete(':id')
  async deleteOrderById(@Param('id') _id_: string): Promise<void> {
    await this.orderRepository.deleteOrder(_id_);
  }

  @Put(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
    @Body() orderDto: UpdateOrderDto,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderRepository.updateOrder(_id_, orderDto),
    );
  }
  @Patch(':id/products')
  async addProductToOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() createOrderProductsDto: CreateOrderedProductDto,
  ): Promise<ExternalOrderedProductDto> {
    const productId = createOrderProductsDto.productId;
    const product = this.productRepository.getProductById(productId);
    return this.mapToExternalOrderProduct(
      await this.orderRepository.addProductToOrder(
        id,
        createOrderProductsDto,
        await product,
      ),
    );
  }
  @Patch(':orderId/:userAddressId')
  async updateUserAddress(
    @Param(':orderId', new ParseUUIDPipe({ version: '4' })) orderId: string,
    @Param(':userAddressId', new ParseUUIDPipe({ version: '4' }))
    userAddressId: string,
  ): Promise<ExternalOrderDto> {
    const order = await this.orderRepository.updateUserAddress(
      orderId,
      userAddressId,
    );
    return this.mapOrderToExternal(order);
  }
  @Delete(':id/products/:idOrderProduct')
  async deleteProductToOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('idOrderProduct', new ParseUUIDPipe({ version: '4' }))
    idOrderProduct: string,
  ): Promise<void> {
    await this.orderRepository.deleteProductToOrder(idOrderProduct);
  }
  mapToExternalOrderProduct(
    orderedProduct: OrderedProduct,
  ): ExternalOrderedProductDto {
    return {
      ...orderedProduct,
      product: orderedProduct.product.id,
      createdAt: dateToArray(orderedProduct.createdAt),
      updatedAt: dateToArray(orderedProduct.updatedAt),
    };
  }

  mapOrderToExternal(order: Order): ExternalOrderDto {
    return {
      ...order,
      createdAt: dateToArray(order.createdAt),
      updatedAt: dateToArray(order.updatedAt),
      user: order.user.id,
      userAddress: order.userAddress.id,
      orderedProducts: order.orderedProducts.map((orderedProduct) => {
        return {
          ...orderedProduct,
          product: orderedProduct.product.id,
          createdAt: dateToArray(orderedProduct.createdAt),
          updatedAt: dateToArray(orderedProduct.updatedAt),
        };
      }),
    };
  }
}
