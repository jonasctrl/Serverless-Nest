import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'api/auth/constants/constants';
import { IsDefined, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class CreateUserInput {
  @ApiProperty()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsDefined()
  password: string;

  @ApiProperty()
  @IsOptional()
  provider?: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsDefined()
  @IsEnum(UserRoles)
  role: string;
}
