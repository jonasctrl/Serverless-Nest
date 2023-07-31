import { Column, Generated } from 'typeorm';

export class BaseEntity {
  @Column()
  @Generated('increment')
  id: number;
}
