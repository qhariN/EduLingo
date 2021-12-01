import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from '../../model/option';

@Injectable()
export class OptionService {

    constructor(@InjectRepository(Option) private readonly repo: Repository<Option>) { }

    public async getOptions(): Promise<Option[]> {
        return await this.repo.createQueryBuilder('option')
            .getMany()
    }
}
