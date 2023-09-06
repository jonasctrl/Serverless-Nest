import { Injectable } from '@nestjs/common';
import { User } from 'infrastructure/data-access/entities';
import { AuditableEntity } from 'infrastructure/data-access/entities/base/auditableEntity';
import { PartialBy } from 'infrastructure/types/generic-types';

@Injectable()
export abstract class IUserWriter {
  abstract createUser(user: PartialBy<User, keyof AuditableEntity>): Promise<void>;
}
