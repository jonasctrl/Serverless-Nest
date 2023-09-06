import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IJwtEncodingService {
  abstract hashPassword(password: string): Promise<string>;
}
