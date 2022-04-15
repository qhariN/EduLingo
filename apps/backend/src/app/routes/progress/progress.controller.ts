import { Controller, Post, Body } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { Progress } from '../../model/progress';
import { User } from '../../model/user';

@Controller('progress')
export class ProgressController {

    constructor(private service: ProgressService) { }

    @Post("insert")
    public async setProgress(@Body() {user, progress} : { user: User, progress: Progress}) {
        return await this.service.setProgress(progress, user.id);
    }

    @Post()
    public async getProgress(@Body() { id }: User) {
        return await this.service.getProgress(id);
    }
}
