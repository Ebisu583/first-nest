import { Injectable } from '@nestjs/common';
import { User } from './db/users.entity';
import {
  CreateUserDto,
  CreateUserAddressDto,
} from 'src/users/dto/create-user.dto';
import {
  UpdateUserAddressDto,
  UpdateUserDto,
} from 'src/users/dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserAddress } from './db/user_addresses.entity';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/user_address.repository';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }
  async getUserByName(name: string): Promise<User> {
    return await this.userRepository.findUserByName(name);
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findUserByEmail(email);
  }
  async deleteUser(id: string): Promise<void> {
    await this.userAddressRepository.deleteUserAddressesByUserId(id);
    await this.userRepository.delete(id);
  }
  async addUser(item: CreateUserDto): Promise<User> {
    const userToSave = new User();
    userToSave.name = item.name;
    userToSave.lastName = item.lastName;
    userToSave.email = item.email;
    userToSave.birth = item.birth;
    userToSave.role = item.role;
    userToSave.address = await this.prepareUserAddressesToSave(item.address);

    return await this.userRepository.save(userToSave);
  }

  async updateUser(id: string, item: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.getUserById(id);
    userToUpdate.name = item.name;
    userToUpdate.lastName = item.lastName;
    userToUpdate.email = item.email;
    userToUpdate.birth = item.birth;
    userToUpdate.role = item.role;
    userToUpdate.address = await this.prepareUserAddressesToSave(item.address);

    return await this.userRepository.save(userToUpdate);
  }
  async prepareUserAddressesToSave(
    address: CreateUserAddressDto[] | UpdateUserAddressDto[],
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.number = add.number;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }
}
