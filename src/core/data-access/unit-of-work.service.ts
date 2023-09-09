import { Injectable, Scope } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { DataAccessBaseService } from './base/data-access-base.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class UnitOfWorkService extends DataAccessBaseService {
  async transaction<T>(fn: (value: EntityManager) => T): Promise<T> {
    return this.manager.transaction(async (manager) => fn(manager));
  }
}
