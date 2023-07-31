import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserInput } from './input/create-user.input';
import { UserOutput } from './output/user.output';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUserContext(@Param('id') id: number): Promise<UserOutput> {
    return this.userService.getUser(id);
  }

  @Post('/')
  async createUser(@Body() request: CreateUserInput): Promise<UserOutput> {
    return this.userService.createUser(request);
  }

  @Get('/')
  async heathbeat(): Promise<{
    module: string;
    status: string;
  }> {
    return {
      module: 'user',
      status: 'live',
    };
  }
}
