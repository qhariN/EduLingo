import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { User } from '../../model/user';
import { UnitService } from './unit.service';

@Controller('unit')
export class UnitController {

    constructor(private service: UnitService) { }

    @Get('all')
    public async getAll() {
        return await this.service.getAll()
    }

    // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post('all/user')
    public async getAllUser(@Body() { id }: User) {
        return await this.service.getAllUser(id);
    }

    @Get('evaluation/:id')
    public async getEvaluation(@Param() params) {
        const { id } = params
        return await this.service.getEvaluation(id)
    }
}
