import { Module } from '@nestjs/common';

import { DatabaseFacadeService } from './database-facade.service';
import { UnitOfWorkService } from './unit-of-work.service';

const providers = [DatabaseFacadeService, UnitOfWorkService];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DataAccessModule {}
