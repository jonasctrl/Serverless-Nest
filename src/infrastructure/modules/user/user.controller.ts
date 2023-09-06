import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserInput } from './input/create-user.input';
import { UserOutput } from './output/user.output';
import { IDQuery } from '../utils';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUserContext(@Param() { id }: IDQuery): Promise<UserOutput> {
    return this.userService.getUser(id);
  }

  @Post('/')
  async createUser(@Body() request: CreateUserInput): Promise<UserOutput> {
    return this.userService.createUser(request);
  }

  @Get('/')
  async heartbeat() {
    return {
      module: 'user',
      status: new Date(),
    };
  }

  @Get('/')
  @Version('1.0')
  async heartbeat_v1m0() {
    return {
      module: '[BETA] - user',
      status: new Date(),
    };
  }
}
