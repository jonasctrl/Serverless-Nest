import { Body, Controller, Get, Param, Post, UseGuards, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt/guards/jwt-auth.guard';
import { IDQuery } from '../utils';
import { CreateUserInput } from './input/create-user.input';
import { UserOutput } from './output/user.output';
import { UserService } from './user.service';
import { UserRoles } from 'core/auth/constants';
import { Roles, RolesGuard } from 'infrastructure/middleware/decorators/roles.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ type: UserOutput })
  @Roles(UserRoles.Admin, UserRoles.Viewer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserContext(): Promise<UserOutput> {
    return this.userService.getUserContext();
  }

  @Get('/:id')
  @Roles(UserRoles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUser(@Param() { id }: IDQuery): Promise<UserOutput> {
    return this.userService.getUser(id);
  }

  // TODO: Remove this endpoint later
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
