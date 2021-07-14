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
            .values([{status:1,user:{id:_id},session:{id:progress.session.id}}])
            .execute();
    }
}
