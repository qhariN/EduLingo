import { Controller, Get } from '@nestjs/common';
import { UnitService } from './unit.service';

@Controller('unit')
export class UnitController {

    constructor(private service: UnitService) { }

    @Get('all')
    public async getAll() {
        return await this.service.getAll()
    }
}
