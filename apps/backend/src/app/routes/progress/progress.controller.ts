import { Controller, Post, Request ,UseGuards, Body } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { Progress } from '../../model/progress';

@Controller('progress')
export class ProgressController {

    constructor(private service: ProgressService) { }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post("insert")
    public async setProgress(@Body() progress : Progress,@Request() request) {
        return await this.service.setProgress(progress,request.user);
    }
}
