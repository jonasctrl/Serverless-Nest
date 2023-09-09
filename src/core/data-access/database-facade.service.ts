import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

import { DataAccessBaseService } from './base/data-access-base.service';
import { UserContext } from 'core/auth/context/user.context';

@Injectable()
export class DatabaseFacadeService extends DataAccessBaseService {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async saveAuditableEntity<T>(value: T, entity: EntityTarget<ObjectLiteral>): Promise<T> {
    return this.manager.getRepository(entity).save({
      ...value,
      updatedOn: new Date(),
      updatedBy: this.getUserId(),
    });
  }

  async softDeleteAuditableEntity<T>(value: T, entity: EntityTarget<ObjectLiteral>): Promise<T> {
    return this.manager.getRepository(entity).save({
      ...value,
      deletedOn: new Date(),
      deletedBy: this.getUserId(),
    });
  }

  private getUserId(): number {
    return UserContext.getUserId() || -1;
  }
}
