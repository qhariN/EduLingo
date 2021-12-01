import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../../model/session';
import { OptionService } from './option.service';
import { Option } from '../../model/option';
import { Question } from '../../model/question';
import { QuestionService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Option, Question])],
  providers: [SessionService, OptionService, QuestionService],
  controllers: [SessionController]
})
export class SessionModule {}
