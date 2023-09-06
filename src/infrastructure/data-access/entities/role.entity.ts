import { Entity, PrimaryColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryColumn()
  name: string;
}
