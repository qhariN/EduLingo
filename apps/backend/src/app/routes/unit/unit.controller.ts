import { Controller, Get, Request, Param } from '@nestjs/common';
import { UnitService } from './unit.service';

@Controller('unit')
export class UnitController {

    constructor(private service: UnitService) { }

    @Get('all')
    public async getAll() {
        return await this.service.getAll()
    }

    // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get('all/user')
    public async getAllUser(@Request() request) {
        return await this.service.getAllUser(request.user);
    }

    @Get('evaluation/:id')
    public async getEvaluation(@Param() params) {
        const { id } = params
        return await this.service.getEvaluation(id)
    }
}
