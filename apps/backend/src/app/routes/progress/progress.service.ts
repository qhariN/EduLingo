import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from '../../model/progress';

@Injectable()
export class ProgressService {

    constructor(@InjectRepository(Progress) private readonly repo: Repository<Progress>) { }

    public async setProgress(progress: Progress,_id:number): Promise<any> {
        return await this.repo.createQueryBuilder('progress')
            .insert()
            .into(Progress)
            .values([{
                status:1,
                time: progress.time,
                points_writing: progress.points_writing,
                points_listening: progress.points_listening,
                points_speaking: progress.points_speaking,
                user:{id:_id},
                session:{id:progress.session.id}
            }])
            .execute();
    }

    public async getProgress(_id:number){        
        const progress = await this.repo.createQueryBuilder('progress')
        .where("status = 1")
        .andWhere('userId = :id',{ id: _id })
        .getMany();

        let size = progress.length;
        let sum_writing = 0;
        let sum_speaking = 0;
        let sum_listening = 0;

        progress.forEach(data => {
            sum_writing += data.points_writing;
            sum_speaking += data.points_speaking;
            sum_listening += data.points_listening;
        });

        let data = {
            points_writing : size > 0 ? (sum_writing/size) : 0 ,
            points_listening : size > 0 ? (sum_listening/size) : 0,
            points_speaking : size > 0 ? (sum_speaking/size) : 0
        }
        return data;
    }
}
