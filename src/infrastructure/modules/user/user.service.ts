import { ConflictException, Injectable } from '@nestjs/common';

import { CreateUserInput } from './input/create-user.input';
import { UserOutput } from './output/user.output';
import { UserRequestContext } from 'core/auth/interfaces/user-request-context';
import { UnitOfWorkService } from 'core/data-access/unit-of-work.service';
import { IUserProvider } from 'core/user/user.provider.abs';
import { IUserWriter } from 'core/user/user.writer.abs';

@Injectable()
export class UserService {
  constructor(
    private readonly userProvider: IUserProvider,
    private readonly userWriter: IUserWriter,
    private readonly unitOfWork: UnitOfWorkService,
  ) {}

  async getUserContext({ id }: UserRequestContext): Promise<UserOutput> {
    const user = await this.userProvider.getUser({ id }, 'id', 'name', 'email');

    const test = await this.userProvider.getUser({ id });
    this.userWriter.updateUser({
      ...test!,
      name: 'Updated name',
    });

    if (!user) {
      throw new ConflictException('User not found');
    }

    return user;
  }

  async getUser(id: number): Promise<UserOutput> {
    // NOTE: Transaction example
    const user = await this.unitOfWork.transaction(async () => {
      return this.userProvider.getUser({ id }, 'id', 'name', 'email');
    });

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
    await this.userWriter.createUser({
      name: request.name,
      email: request.email,
      role: request.role,
      password: request.password,
      image: request.image,
      provider: request.provider,
    });

    const persistedUser = await this.userProvider.getUser(
      { email: request.email },
      'id',
      'name',
      'email',
    );

    if (!persistedUser) {
      throw new ConflictException('User not found');
    }

    return {
      id: persistedUser!.id,
      email: persistedUser!.email,
      name: persistedUser!.name,
    };
  }
}
