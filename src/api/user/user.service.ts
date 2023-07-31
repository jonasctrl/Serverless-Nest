import { ConflictException, Injectable } from '@nestjs/common';

import { CreateUserInput } from './input/create-user.input';
import { UserOutput } from './output/user.output';
import { UserProvider } from './user-data-access/user.provider';
import { UserWriter } from './user-data-access/user.writer';

@Injectable()
export class UserService {
  constructor(
    private readonly userProvider: UserProvider,
    private readonly userWriter: UserWriter,
  ) {}

  async getUser(id: number): Promise<UserOutput> {
    const user = await this.userProvider.getUser({ id }, 'id', 'name', 'email');

    if (!user) {
      throw new ConflictException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async createUser(request: CreateUserInput): Promise<UserOutput> {
    const user = await this.userWriter.createUser({
      name: request.name,
      email: request.email,
      role: request.role,
      password: request.password,
      image: request.image,
      provider: request.provider,
    });

    const persistedUser = await this.userProvider.getUser(
      { email: user.email },
      'id',
      'name',
      'email',
    );

    return {
      id: persistedUser!.id,
      email: persistedUser!.email,
      name: persistedUser!.name,
    };
  }
}
