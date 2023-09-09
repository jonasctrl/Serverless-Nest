import { Injectable } from '@nestjs/common';

import { DatabaseFacadeService } from 'core/data-access/database-facade.service';
import { IUserWriter } from 'core/user/user.writer.abs';
import { User } from 'infrastructure/data-access/entities';
import { AuditableEntity } from 'infrastructure/data-access/entities/base/auditableEntity';
import { PartialBy } from 'infrastructure/types/generic-types';

@Injectable()
export class UserWriter implements IUserWriter {
  constructor(private readonly db: DatabaseFacadeService) {}

  async createUser(user: PartialBy<User, keyof AuditableEntity>) {
    const connection = this.db.manager.connection;
    const repository = connection.getRepository(User);

    const persistedUser = repository.create(user);

    await repository.save(persistedUser);
  }

  async updateUser(user: User) {
    await this.db.saveAuditableEntity(user, User);
  }
}
