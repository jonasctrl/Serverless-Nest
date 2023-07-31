import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

import * as Entities from '../entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config: SqlServerConnectionOptions = {
          type: 'mssql',
          host: configService.get('DB_HOST_ADDRESS'),
          port: parseInt(configService.get('DB_HOST_PORT')!),
          username: configService.get('DB_HOST_USERNAME'),
          password: configService.get('DB_HOST_PASSWORD'),
          database: configService.get('DB_HOST_DATABASE'),
          entities: Object.values(Entities),
          synchronize: false,
          options: { encrypt: false },
        };

        return config;
      },
    }),
  ],
})
class DatabaseModule {}

export default DatabaseModule;
