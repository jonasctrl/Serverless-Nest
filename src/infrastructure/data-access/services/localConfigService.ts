import { ConfigService } from '@nestjs/config';
import { config as ConfigFactory } from 'dotenv';

import { getResolvedEnvironmentFilePath } from '../../environment/utils/utils';
import { BaseService } from './baseService';

export class LocalConfigService implements BaseService {
  private configService: ConfigService;

  constructor() {
    const path = getResolvedEnvironmentFilePath({
      stage: 'local',
    });
    const config = ConfigFactory({ path });

    this.configService = new ConfigService(config);
  }

  public get(value: string): string | undefined {
    return this.configService.get(value);
  }
}
