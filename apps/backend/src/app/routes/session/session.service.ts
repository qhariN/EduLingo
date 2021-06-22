import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../../model/session';

@Injectable()
export class SessionService {

    constructor(@InjectRepository(Session) private readonly repo: Repository<Session>) { }

    public async getPractice(id: number) {
        return await this.repo.createQueryBuilder('session')
            .leftJoinAndSelect('session.question', 'question')
            .leftJoinAndSelect('question.option_question', 'option_question')
            .leftJoinAndSelect('option_question.option', 'option')
            .orderBy('question.id', 'ASC')
            .orderBy('option_question.id', 'ASC')
            .where('session.id = :id',{ id: id })
            .andWhere('session.status = 1')
            .getOneOrFail()
    }
}
