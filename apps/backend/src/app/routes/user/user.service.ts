import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from '../../model/unit';
import { User } from '../../model/user';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly repo: Repository<Unit>) { }

    public async createUser(): Promise<Unit[]> {
        return await this.repo.createQueryBuilder('user')
            .insert()
            .into(User)
            .values({
                name: '',
                email: '',
                password: ''
            })
            .execute()
            .then(result => result.identifiers[0].id)
    }
}
