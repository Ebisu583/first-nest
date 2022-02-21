import { Order } from 'src/orders/db/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Roles } from '../../shared/enums/roles.enum';
import { UserAddress } from './user_addresses.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ type: 'datetime' })
  birth: Date;

  @Column('enum', {
    enum: Roles,
  })
  role: Roles;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => UserAddress, (address) => address.user)
  address?: UserAddress[];

  @OneToMany(() => Order, (order) => order.user)
  order?: Order[];
}
