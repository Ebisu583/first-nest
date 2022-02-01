import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ExternalUserDto } from 'src/users/dto/external.user.dto';
import { UsersDataService } from './users-data.service';
import { User } from './db/users.entity';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserValidatorService } from './user-validator.service';

@Controller('users')
export class UsersController {
  constructor(
    private userRepository: UsersDataService,
    private userValidator: UserValidatorService,
  ) {}

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(await this.userRepository.getUserById(_id_));
  }

  @Post()
  async addUser(@Body() _user_: CreateUserDto): Promise<ExternalUserDto> {
    await this.userValidator.validateUniqueEmail(_user_.email);
    console.log(_user_);
    
    return this.mapUserToExternal(await this.userRepository.addUser(_user_));
  }

  @Get()
  async getAllUsers(): Promise<Array<ExternalUserDto>> {
    return (await this.userRepository.getAllUsers()).map((user) =>
      this.mapUserToExternal(user),
    );
  }

  @Delete(':id')
  async deleteUserById(@Param('id') _id_: string): Promise<void> {
    await this.userRepository.deleteUser(_id_);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(
      await this.userRepository.updateUser(_id_, userDto),
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
