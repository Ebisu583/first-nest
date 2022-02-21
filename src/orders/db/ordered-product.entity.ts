import { Product } from 'src/products/db/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({
  name: 'ordered_products',
})
export class OrderedProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 0,
    type: 'float',
  })
  orderingPrice: number;

  @Column({
    default: 1,
  })
  unitAmount: number;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ManyToOne(() => Order, (order) => order.id)
  order: Order;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
