import { Controller, Get, Param } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {

    constructor(private service: SessionService) { }

    @Get('practice/:id')
    public async getPractice(@Param() params) {
        let { id } = params
        return await this.service.getPractice(id)
    }
}
