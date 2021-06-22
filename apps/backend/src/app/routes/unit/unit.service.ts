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

    public async getAllUser(_id: number) {
        return await this.repo.createQueryBuilder('unit')
            .leftJoinAndSelect('unit.section', 'section')
            .leftJoinAndSelect('section.session', 'session')
            .leftJoinAndSelect('session.progress', 'progress', 'progress.userId = :id', { id: _id})
            .getMany()
    }

    public async getEvaluation(id: number) {
        return await this.repo.createQueryBuilder('session')
            .leftJoinAndSelect('session.question', 'question')
            .leftJoinAndSelect('question.option_question', 'option_question')
            .leftJoinAndSelect('option_question.option', 'option')
            .orderBy('question.id', 'ASC')
            .orderBy('option_question.id', 'ASC')
            .where('question.id = :id',{ id: id })
            .andWhere('session.status = 1')
    }
}
