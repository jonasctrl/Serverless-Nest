import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterInput {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @MinLength(2)
  @MaxLength(32)
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsDefined()
  email: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
