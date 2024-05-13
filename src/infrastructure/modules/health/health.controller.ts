import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Readable } from 'stream';

import { S3Service } from 'infrastructure/modules/aws/s3/s3.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly s3Service: S3Service) {}

  @Get('/')
  async check() {
    const time = new Date().toISOString();

    // Create a dummy file and convert it into a readable stream.
    const fileContent = `Hello, world! - ${time}`;
    const fileStream = new Readable();
    fileStream.push(fileContent);
    fileStream.push(null);

    // Assuming fileKey is unique and using time is one way to ensure that
    const fileKey = `test-${time}.txt`;

    const url = await this.s3Service.uploadFile('custom-storage-prod', fileKey, fileStream);

    return {
      status: 'ok',
      time,
      url: url,
    };
  }
}
