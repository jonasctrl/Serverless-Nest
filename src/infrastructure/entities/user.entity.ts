import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

import { AuditableEntity } from './base/auditableEntity';

@Entity('users')
export class User extends AuditableEntity {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  provider?: string;

  @PrimaryColumn()
  @Unique(['email'])
  email: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  role: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
