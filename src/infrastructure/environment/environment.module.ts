import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configValidationSchema } from './schema.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        () => ({
          HOST_PORT: process.env.HOST_PORT,
          DB_HOST_TYPE: process.env.DB_HOST_TYPE,
          DB_HOST_ADDRESS: process.env.DB_HOST_ADDRESS,
          DB_HOST_PORT: process.env.DB_HOST_PORT,
          DB_HOST_USERNAME: process.env.DB_HOST_USERNAME,
          DB_HOST_PASSWORD: process.env.DB_HOST_PASSWORD,
          DB_HOST_DATABASE: process.env.DB_HOST_DATABASE,
          JWT_SECRET: process.env.JWT_SECRET,
          JWT_EXPIRE: process.env.JWT_EXPIRE,
        }),
      ],
      validationSchema: configValidationSchema,
    }),
  ],
})
class EnvironmentModule {}

export default EnvironmentModule;
