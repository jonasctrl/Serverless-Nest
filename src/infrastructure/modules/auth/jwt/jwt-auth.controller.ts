import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'infrastructure/data-access/entities';

import { JwtAuthService } from './services/jwt-auth.service';
import { Token } from '../../../../core/auth/jwt/interfaces';
import { LoginInput } from '../input/login.input';
import { RegisterInput } from '../input/register.input';

@ApiTags('Auth')
@Controller('auth')
export class JwtAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Post('/login')
  async login(@Body() request: LoginInput): Promise<Token> {
    const { email, password } = request;
    return this.jwtAuthService.login({
      email,
      password,
    });
  }

  @Post('/register')
  async register(@Body() request: RegisterInput): Promise<void> {
    const { name, email, password } = request;
    return this.jwtAuthService.register(
      new User({
        name,
        email,
        password,
      }),
    );
  }
}
