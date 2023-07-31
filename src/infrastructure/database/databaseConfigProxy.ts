import { ConfigService } from '@nestjs/config';
import { config as ConfigFactory } from 'dotenv';

import { getEnvPath } from '../environment/utils';

export class DatabaseConfigProxy {
  private configService: ConfigService;

  constructor() {
    const config = ConfigFactory({ path: getEnvPath() });
    this.configService = new ConfigService(config);
  }

  public get(value: string): string {
    if (!value || typeof value !== 'string') {
      throw new Error(`Invalid config value: ${value}`);
    }

    return this.configService.get(value) || '';
  }
}
