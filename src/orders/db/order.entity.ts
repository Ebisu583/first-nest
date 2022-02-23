import { User } from 'src/users/db/users.entity';
import { UserAddress } from 'src/users/db/user_addresses.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Statuses } from '../shared/enums/statuses.enum';
import { OrderedProduct } from './ordered-product.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: true })
  addInfo: string;

  @Column({
    default: 0,
    type: 'float',
  })
  totalPrice: number;

  @Column('enum', {
    enum: Statuses,
  })
  status: Statuses;

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order, {
    eager: true,
  })
  orderedProducts?: OrderedProduct[];

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => UserAddress, (userAddress) => userAddress.id)
  userAddress: UserAddress;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
