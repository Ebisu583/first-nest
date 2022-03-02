import {
  Between,
  EntityRepository,
  Equal,
  FindConditions,
  FindManyOptions,
  LessThan,
  Like,
  MoreThan,
  Repository,
} from 'typeorm';
import { TextFilterType, UsersQuery } from '../queries/user-query.interface';
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
  findAll(_query_: UsersQuery): Promise<User[]> {
    return this.find(this.buildPredicate(_query_));
  }
  private buildPredicate(query: UsersQuery): FindManyOptions<User> {
    const predicate: FindConditions<User> = {};
    if (query.name) {
      predicate.name = Equal(query.name);
    }
    if (query.lastName) {
      predicate.lastName = Equal(query.lastName);
    }
    if (query.email && query.emailFilterType === TextFilterType.CONTAINS) {
      predicate.email = Like(`%${query.email}%`);
    } else if (query.email) {
      predicate.email = Equal(query.email);
    }

    if (query.minDate && query.maxDate) {
      predicate.birth = Between(
        new Date(query.minDate),
        new Date(query.maxDate),
      );
    } else if (query.minDate) {
      predicate.birth = MoreThan(new Date(query.minDate));
    } else if (query.maxDate) {
      predicate.birth = LessThan(new Date(query.maxDate));
    }
    if (query.role) {
      predicate.role = Equal(query.role);
    }

    const findManyOptions: FindManyOptions<User> = {
      where: predicate,
      [query.sortField || 'createdAt']: query.orderDirection || 'ASC',
    };

    return findManyOptions;
  }
}
