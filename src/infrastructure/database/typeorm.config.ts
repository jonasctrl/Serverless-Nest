import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

import { DatabaseConfigProxy } from './databaseConfigProxy';

const configProxy = new DatabaseConfigProxy();

const typeOrmConfig: DataSourceOptions = {
  type: 'mssql',
  host: configProxy.get('DB_HOST_ADDRESS'),
  port: parseInt(configProxy.get('DB_HOST_PORT')),
  username: configProxy.get('DB_HOST_USERNAME'),
  password: configProxy.get('DB_HOST_PASSWORD'),
  database: configProxy.get('DB_HOST_DATABASE'),
  migrations: [path.join('.dist', 'migrations', '*.{js, ts}')],
  synchronize: false,
  options: { encrypt: false },
};

export default new DataSource(typeOrmConfig);
