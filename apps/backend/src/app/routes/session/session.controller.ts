import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { Question } from '../../model/question';
import { Session } from '../../model/session';
import { OptionService } from './option.service';
import { QuestionService } from './question.service';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {

    constructor(private service: SessionService, private sOption: OptionService, private sQuestion: QuestionService) { }

    @Get('practice/:id')
    public async getPractice(@Param() params) {
        const { id } = params
        return await this.service.getPractice(id)
    }

    @Get('practice/norand/:id')
    public async getPracticeNoRand(@Param() params) {
        const { id } = params
        return await this.service.getPracticeNoRand(id)
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post("insert")
    public async createSession(@Body() session: Session) {
        return await this.service.createSession(session)
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Patch("deactivate/:id")
    public async deactivateSession(@Param() params) {
        const { id } = params
        return await this.service.deactivateSession(id)
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post("question/create")
    public async createQuestion(@Body() question: Question) {
        return await this.sQuestion.createQuestion(question)
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post("question/update")
    public async updateQuestion(@Body() question: Question) {
        return await this.service.updateQuestion(question)
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Patch("question/deactivate/:id")
    public async deactivateQuestion(@Param() params) {
        const { id } = params
        return await this.service.deactivateQuestion(id)
    }

    @Get('options')
    public async getOptions() {
        return await this.sOption.getOptions()
    }
}
