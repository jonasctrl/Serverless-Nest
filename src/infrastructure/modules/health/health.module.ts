import { Module } from '@nestjs/common';

import { S3Module } from '../aws/s3/s3.module';
import { HealthController } from './health.controller';

@Module({
  imports: [S3Module],
  controllers: [HealthController],
})
export class HealthModule {}
