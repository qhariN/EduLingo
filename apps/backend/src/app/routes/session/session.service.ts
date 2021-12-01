import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { OptionQuestion } from '../../model/option-question';
import { Question } from '../../model/question';
import { Session } from '../../model/session';

@Injectable()
export class SessionService {

    constructor(@InjectRepository(Session) private readonly repo: Repository<Session>) { }

    public async getPractice(id: number): Promise<Session> {
        return await this.repo.createQueryBuilder('session')
            .leftJoinAndSelect('session.question', 'question')
            .leftJoinAndSelect('question.option_question', 'option_question')
            .leftJoinAndSelect('option_question.option', 'option')
            .where('question.status = 1')
            .andWhere('option_question.status = 1')
            .andWhere('session.id = :id',{ id: id })
            .orderBy('RAND()')
            .getOneOrFail()
    }

    public async getPracticeNoRand(id: number): Promise<Session> {
        return await this.repo.createQueryBuilder('session')
            .leftJoinAndSelect('session.question', 'question')
            .leftJoinAndSelect('question.option_question', 'option_question')
            .leftJoinAndSelect('option_question.option', 'option')
            .where('question.status = 1')
            .andWhere('option_question.status = 1')
            .andWhere('session.id = :id',{ id: id })
            .getOne()
    }

    public async deactivateSession(id: number) {
        return await this.repo.createQueryBuilder('session')
            .update(Session)
            .set({ status: 0 })
            .where('id = :id', { id: id })
            .execute()
    }

    public async updateQuestion(question: Question): Promise<InsertResult> {
        await this.repo.createQueryBuilder('session')
            .update(Question)
            .set({
                question: question.question,
                text: question.text,
                type: question.type,
                img_url: question.img_url,
                status: question.status
            })
            .where('id = :id', { id: question.id })
            .execute()

        await this.repo.createQueryBuilder('option_question')
            .update(OptionQuestion)
            .set({
                status: 0
            })
            .where('questionId = :id', { id: question.id })
            .execute()

        return await this.repo.createQueryBuilder('option_question')
            .insert()
            .into(OptionQuestion)
            .values(question.option_question)
            .execute()
    }

    public async deactivateQuestion(id: number) {
        return await this.repo.createQueryBuilder('question')
            .update(Question)
            .set({ status: 0 })
            .where('id = :id', { id: id })
            .execute()
    }

    public async createSession(session: Session): Promise<InsertResult> {
        return await this.repo.createQueryBuilder('session')
            .insert()
            .into(Session)
            .values(session)
            .execute()
    }
}
