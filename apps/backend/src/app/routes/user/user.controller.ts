import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private service: UserService) { }

    @Post('insert')
    public async createUser() {
        return await this.service.createUser()
    }
}
