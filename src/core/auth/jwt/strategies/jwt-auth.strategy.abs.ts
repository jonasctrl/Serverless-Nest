import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IJwtAuthStrategy {
  abstract validate(payload: any): Promise<any>;
}
