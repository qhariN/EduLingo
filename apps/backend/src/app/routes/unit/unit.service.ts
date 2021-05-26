import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from '../../model/unit';

@Injectable()
export class UnitService {

    constructor(@InjectRepository(Unit) private readonly repo: Repository<Unit>) { }

    public async getAll() {
        return await this.repo.createQueryBuilder('unit')
            .leftJoinAndSelect('unit.section', 'section')
            .leftJoinAndSelect('section.session', 'session')
            .getMany()
    }
}
