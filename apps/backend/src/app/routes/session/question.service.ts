import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { OptionQuestion } from '../../model/option-question';
import { Question } from '../../model/question';

@Injectable()
export class QuestionService {

    constructor(@InjectRepository(Question) private readonly repo: Repository<Question>) { }

    public async createQuestion(question: Question): Promise<InsertResult> {
        const newId = await this.repo.createQueryBuilder('question')
            .insert()
            .into(Question)
            .values({
                question: question.question,
                text: question.text,
                type: question.type,
                img_url: question.img_url,
                status: question.status,
                session: {
                    id: question.session.id
                }
            })
            .execute()

        const opt: OptionQuestion[] = []
        question.option_question.forEach(val => {
            opt.push({
                ...val,
                question: {
                    id: newId.identifiers[0].id
                }
            })
        })

        return await this.repo.createQueryBuilder('option_question')
            .insert()
            .into(OptionQuestion)
            .values(opt)
            .execute()
    }
}
