import { Injectable } from '@nestjs/common';
import { User } from 'src/users/interfaces/user.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  getAllItems(): Array<User> {
    return this.users;
  }
  getItemById(id: string): User {
    console.log(id);
    console.log(this.users);
    console.log(this.users.find((user) => user.id == id));

    return this.users.find((user) => user.id == id);
  }
  findUserByName(name: string): User {
    return this.users.find((user) => user.name == name);
  }
  findUserByEmail(email: string): User {
    return this.users.find((user) => user.email == email);
  }
  deleteItem(id: string): boolean {
    const user = this.users.find((user) => user.id == id);
    if (user) {
      const usersIds = this.users.map((user) => user.id);
      const indexToDelete = usersIds.indexOf(id);
      this.users.splice(indexToDelete, 1);
      return true;
    } else {
      return false;
    }
  }
  addItem(item: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...item,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateItem(id: string, item: UpdateUserDto): User {
    this.users = this.users.map((i) => {
      if (i.id === id) {
        return {
          ...item,
          id: i.id,
          createdAt: i.createdAt,
          updatedAt: new Date(),
        };
      }

      return i;
    });

    return this.getItemById(id);
  }
}
