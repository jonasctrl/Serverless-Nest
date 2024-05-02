import { ConfigService } from '@nestjs/config';
import { config as ConfigFactory } from 'dotenv';

import { BaseConfigService } from './base/baseConfigService';

export class LocalConfigService implements BaseConfigService {
  private configService: ConfigService;

  constructor() {
    const config = ConfigFactory();
    this.configService = new ConfigService(config);
  }

  public get(value: string): string | undefined {
    return this.configService.get(value);
  }
}
