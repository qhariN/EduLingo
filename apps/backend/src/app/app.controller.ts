import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Permissions } from './auth/permissions.decorator';
import { PermissionsGuard } from './auth/permissions.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  @Permissions('create:items')
  getData() {
    return this.appService.getData();
  }
}
