import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AzureAuthGuard } from './guards/azure-auth.guard';

@ApiTags('Auth')
@Controller('auth/azure')
export class AzureOAuthController {
  constructor(readonly configService: ConfigService) {}

  @Get()
  @UseGuards(AzureAuthGuard)
  async login() {
    // Initiates the Azure AD login process
  }

  @Post('callback')
  async callback(@Req() _req: Request, @Res() res: Response) {
    return res.redirect('/');
  }
}
