import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ExternalUserDto } from 'src/users/dto/external.user.dto';
import { UsersDataService } from './users-data.service';
import { User } from 'src/users/interfaces/user.interface';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Get(':id')
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.getItemById(_id_));
  }

  @Post()
  addUser(@Body() _user_: CreateUserDto): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.addItem(_user_));
  }

  @Get()
  getAllUsers(): Array<ExternalUserDto> {
    return this.userRepository
      .getAllItems()
      .map((user) => this.mapUserToExternal(user));
  }

  @Delete(':id')
  deleteUserById(@Param('id') _id_: string): void {
    this.userRepository.deleteItem(_id_);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
    @Body() userDto: UpdateUserDto,
  ): ExternalUserDto {
    return this.mapUserToExternal(
      this.userRepository.updateItem(_id_, userDto),
    );
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      birth: dateToArray(user.birth),
      createdAt: dateToArray(user.createdAt),
      updatedAt: dateToArray(user.updatedAt),
    };
  }
}
