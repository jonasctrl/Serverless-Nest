import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get('/')
  async check() {
    const time = new Date().toISOString();
    return {
      status: 'ok',
      time,
    };
  }
}
