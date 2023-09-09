import { Module } from '@nestjs/common';

import { DataAccessModule } from './data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  exports: [DataAccessModule],
})
export class CoreModule {}
