import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export abstract class DataAccessBaseService {
  readonly manager: EntityManager;

  constructor(private readonly dataSource: DataSource) {
    this.manager = this.dataSource.manager;
  }
}
