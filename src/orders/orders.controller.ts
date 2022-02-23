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
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ExternalOrderDto } from './dto/external-order.dto';
import { OrdersDataService } from './orders-data.service';
import { Order } from './db/order.entity';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderRepository: OrdersDataService) {}

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
          order: orderedProduct.order.id,
          product: orderedProduct.product.id,
          createdAt: dateToArray(orderedProduct.createdAt),
          updatedAt: dateToArray(orderedProduct.updatedAt),
        };
      }),
    };
  }
}
