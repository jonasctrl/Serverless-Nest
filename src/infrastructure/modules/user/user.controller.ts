import { Body, Controller, Get, Param, Post, UseGuards, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRoles } from '../../../core/auth/constants';
import { UserRequestContext } from '../../../core/auth/interfaces';
import { JwtAuthGuard } from '../auth/jwt/guards/jwt-auth.guard';
import { IDQuery } from '../utils';
import { CreateUserInput } from './input/create-user.input';
import { UserOutput } from './output/user.output';
import { UserService } from './user.service';
import { Roles, RolesGuard } from 'infrastructure/middleware/decorators/roles.decorator';
import { CurrentContext } from 'infrastructure/middleware/decorators/user-context.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @Roles(UserRoles.Admin, UserRoles.Viewer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserContext(@CurrentContext() context: UserRequestContext): Promise<UserOutput> {
    return this.userService.getUserContext(context);
  }

  @Get('/:id')
  async getUser(@Param() { id }: IDQuery): Promise<UserOutput> {
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
