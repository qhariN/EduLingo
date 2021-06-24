import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'express';
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
        
        let questions = [];

        let all = await this.repo.createQueryBuilder('unit')
        .innerJoinAndSelect('unit.section','section')
        .innerJoinAndSelect('section.session','session')
        .innerJoinAndSelect('session.question', 'question')
        .innerJoinAndSelect('question.option_question', 'option_question')
        .innerJoinAndSelect('option_question.option', 'option')
        .where('question.status = 1')    
        .andWhere('unit.id = :id',{ id: id })   
        .orderBy('RAND()')
        .getMany();
       
        if(all.length > 0){
            all[0].section.forEach(section => {
                section.session.forEach(session => {
                  session.question.forEach(question => {
                     questions.push(question);
                  });
                });
            });
            questions = questions.slice(0,40);
        }
        return questions;
    }
}
