import { Injectable } from '@nestjs/common';
import { ConflictException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { UserProvider } from 'api/user/user-data-access/user.provider';
import { UserWriter } from 'api/user/user-data-access/user.writer';
import crypto from 'crypto';
import { User } from 'infrastructure/entities';

import { AuthOptions } from './interfaces/auth-options.interface';
import { UserRoles } from '../constants/constants';
import { JwtPayload } from '../constants/types';
import { Token } from './interfaces';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersProvider: UserProvider,
    private readonly usersWriter: UserWriter,
  ) {}

  public async login(requestUser: User, options?: AuthOptions): Promise<Token> {
    let user = await this.usersProvider.getUser({
      email: requestUser.email,
    });
    const isSSO = options?.sso;

    if (!user && isSSO) {
      user = await this.usersWriter.createUser({
        ...requestUser,
        role: UserRoles.Viewer,
      });
    }

    await this.validateCredentials(requestUser.password, user);

    const payload: JwtPayload = {
      id: user!.id,
      email: requestUser.email,
      role: user!.role || UserRoles.Viewer,
    };
    const token = this.jwtService.sign(payload);

    return {
      token: token,
    };
  }

  public async register(requestUser: User): Promise<void> {
    const { name, email, password } = requestUser;
    const user = await this.usersProvider.getUser({
      email: email,
    });

    if (user) {
      throw new ConflictException('User with this email already exist');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.usersWriter.createUser({
      name: name,
      email: email,
      password: hashedPassword,
      role: UserRoles.Viewer,
    });
  }

  private async validateCredentials(password: string, user?: User | null) {
    if (!user) {
      throw new ConflictException('User does not exist');
    }

    const isUserValid = user && user.password;
    const passwordMatch = isUserValid && (await this.compareWithSalt(password, user.password));

    if (!passwordMatch) {
      throw new UnauthorizedException('Please check your credentials');
    }
  }

  private async compareWithSalt(
    password: string,
    hashedPasswordWithSalt: string,
  ): Promise<boolean> {
    const [hashedPassword, salt] = hashedPasswordWithSalt.split('$');
    const hashedInputPassword = await this.hashWithSalt(password, salt);
    return hashedPassword === hashedInputPassword;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex'); // Generating a random 16-byte salt
    const hashedPassword = await this.hashWithSalt(password, salt);
    return hashedPassword;
  }

  private async hashWithSalt(password: string, salt: string): Promise<string> {
    return new Promise((resolve) => {
      const hash = crypto.createHash('sha512');
      hash.update(password + salt);
      const hashedPassword = hash.digest('hex');
      resolve(hashedPassword);
    });
  }
}
