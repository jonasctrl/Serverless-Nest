import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

import { INT32_MAX } from '../constants';

export class IDQuery {
  @IsInt()
  @Min(0)
  @Max(INT32_MAX)
  @Type(() => Number)
  id: number;
}
