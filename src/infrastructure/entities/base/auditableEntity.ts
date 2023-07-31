import { Column } from 'typeorm';

import { BaseEntity } from './baseEntity';

export class AuditableEntity extends BaseEntity {
  @Column()
  createdOn: Date;

  @Column()
  createdBy: number;

  @Column()
  updatedOn: Date;

  @Column()
  updatedBy: number;

  @Column({ nullable: true })
  deletedOn?: Date;

  @Column({ nullable: true })
  deletedBy?: number;
}
