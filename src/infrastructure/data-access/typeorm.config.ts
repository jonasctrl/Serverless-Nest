import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

import * as Entities from './entities';
import { BaseService } from './services/baseService';
import { LocalConfigService } from './services/localConfigService';

export const typeOrmConfigProxy = <T extends BaseService>(configService: T): DataSourceOptions => ({
  type: 'mssql',
  host: configService.get('DB_HOST_ADDRESS'),
  port: parseInt(configService.get('DB_HOST_PORT')!),
  username: configService.get('DB_HOST_USERNAME'),
  password: configService.get('DB_HOST_PASSWORD'),
  database: configService.get('DB_HOST_DATABASE'),
  migrations: [path.join('.dist', 'migrations', '*.{js, ts}')],
  entities: Object.values(Entities),
  synchronize: false,
  options: { encrypt: false },
});

export default new DataSource(typeOrmConfigProxy(new LocalConfigService()));
