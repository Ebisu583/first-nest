import { EntityRepository, Repository, In } from 'typeorm';
import { UserAddress } from './user_addresses.entity';

@EntityRepository(UserAddress)
export class UserAddressRepository extends Repository<UserAddress> {
  async deleteUserAddressesByUserId(userId: string): Promise<void> {
    const usersAddresses = await this.find({
      where: {
        userId,
      },
    });

    this.remove(usersAddresses);
  }
}
