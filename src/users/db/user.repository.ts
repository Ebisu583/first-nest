import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserByEmail(email: string): Promise<User> {
    return await this.findOne({
      where: { email: email },
    });
  }
  async findUserByName(name: string): Promise<User> {
    return await this.findOne({
      where: { name: name },
    });
  }
}
