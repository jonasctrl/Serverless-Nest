import { Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';

import { JwtEncodingService } from './jwt-encoding.service';
import { JwtValidationService } from './jwt-validation.service';
import { UserRoles } from 'core/auth/constants';
import { JwtPayload } from 'core/auth/interfaces';
import { AuthOptions, Token } from 'core/auth/jwt/interfaces';
import { IJwtAuthService } from 'core/auth/jwt/jwt-auth.service.abs';
import { IUserProvider } from 'core/user/user.provider.abs';
import { IUserWriter } from 'core/user/user.writer.abs';
import { User } from 'infrastructure/data-access/entities';

@Injectable()
export class JwtAuthService implements IJwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtValidationService: JwtValidationService,
    private readonly jwtEncodingService: JwtEncodingService,
    private readonly usersProvider: IUserProvider,
    private readonly usersWriter: IUserWriter,
  ) {}

  public async login(
    request: {
      email: string;
      password: string;
    },
    options?: AuthOptions,
  ): Promise<Token> {
    const user = await this.usersProvider.getUser({
      email: request.email,
    });

    const isSSO = options?.sso;

    if (!user && isSSO) {
      throw new ConflictException('SSO - not implemented yet');
    }

    await this.jwtValidationService.validateCredentials(request.password, user);

    const payload: JwtPayload = {
      id: user!.id,
      email: request.email,
      role: user!.role || UserRoles.Viewer,
    };
    const token = this.jwtService.sign(payload);

    return {
      token: token,
    };
  }

  public async register({ name, email, password }: User): Promise<void> {
    const user = await this.usersProvider.getUser({
      email: email,
    });

    if (user) {
      throw new ConflictException('User with this email already exist');
    }

    const hashedPassword = await this.jwtEncodingService.hashPassword(password);

    await this.usersWriter.createUser({
      name: name,
      email: email,
      password: hashedPassword,
      role: UserRoles.Viewer,
    });
  }
}
