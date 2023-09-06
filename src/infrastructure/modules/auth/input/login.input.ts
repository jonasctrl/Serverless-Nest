import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MaxLength } from 'class-validator';

export class LoginInput {
  @ApiProperty()
  @IsEmail()
  @IsDefined()
  @MaxLength(64)
  email: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @MaxLength(32)
  password: string;
}
