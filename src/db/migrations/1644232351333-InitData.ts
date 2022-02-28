import { Product } from 'src/products/db/product.entity';
import { Tag } from 'src/products/db/tag.entity';
import { getRepository, MigrationInterface } from 'typeorm';
import * as faker from 'faker';
import { User } from 'src/users/db/users.entity';
import { Roles } from 'src/shared/enums/roles.enum';
import { UserAddress } from 'src/users/db/user_addresses.entity';

export class InitData1644232351333 implements MigrationInterface {
  public async down(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async up(): Promise<void> {
    console.log('save starts...');
    await this.saveTags();
    await this.saveProducts();
    await this.saveUsers();
  }

  private async saveTags(): Promise<Tag[]> {
    const tagsArr: Tag[] = [];
    const tags = [
      {
        name: 'NEW',
      },
      {
        name: 'PROMO',
      },
      {
        name: 'LAST_ITEMS',
      },
    ];
    console.log(tagsArr);

    for (const tag of tags) {
      const tagToSave = new Tag();
      tagToSave.name = tag.name;
      tagsArr.push(await getRepository('Tag').save(tagToSave));
    }

    console.log('Tags saved');

    return tagsArr;
  }
  private async saveProducts(): Promise<Product[]> {
    const productsArr: Product[] = [];

    for (let i = 0; i < 100; i++) {
      const productToSave = new Product();
      productToSave.name = faker.commerce.productName();
      productToSave.price = faker.commerce.price();
      productToSave.count = faker.datatype.number();
      productToSave.tags = [];
      console.log(productToSave);
      productsArr.push(await getRepository('Product').save(productToSave));
    }

    console.log('Products saved');

    return productsArr;
  }
  private async saveUsers(): Promise<User[]> {
    const usersArr: User[] = [];

    for (let i = 0; i < 100; i++) {
      const userToSave = new User();
      userToSave.name = faker.name.firstName();
      userToSave.lastName = faker.name.lastName();
      userToSave.email = faker.internet.email();
      userToSave.birth = faker.date.past();
      userToSave.role = Roles.ADMIN;
      console.log(userToSave);
      usersArr.push(await getRepository('User').save(userToSave));
      for (let i = 0; i < 10; i++) {
        const userAddressToSave = new UserAddress();
        userAddressToSave.country = faker.address.country();
        userAddressToSave.city = faker.address.city();
        userAddressToSave.street = faker.address.streetName();
        userAddressToSave.number = faker.datatype.number();
        userAddressToSave.user = userToSave;
        await getRepository('UserAddress').save(userAddressToSave);
      }
    }

    console.log('Users saved');

    return usersArr;
  }
}
