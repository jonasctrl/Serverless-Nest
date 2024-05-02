import { ApiProperty } from '@nestjs/swagger';

export class UserOutput {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
