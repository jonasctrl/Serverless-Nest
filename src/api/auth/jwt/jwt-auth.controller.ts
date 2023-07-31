import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'infrastructure/entities';

import { LoginInput } from '../input/login.input';
import { RegisterInput } from '../input/register.input';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { Token } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class JwtAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Post('/login')
  async login(@Body() request: LoginInput): Promise<Token> {
    const { email, password } = request;
    return this.jwtAuthService.login(
      new User({
        email,
        password,
      }),
    );
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
