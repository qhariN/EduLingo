import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthzModule } from './auth/authz.module';
import { User } from './model/user';
import { Progress } from './model/progress';
import { Unit } from './model/unit';
import { Section } from './model/section';
import { OptionQuestion } from './model/option-question';
import { Option } from './model/option';
import { Question } from './model/question';
import { Session } from './model/session';
import { UnitModule } from './routes/unit/unit.module';
import { SessionModule } from './routes/session/session.module';
import { ProgressModule } from './routes/progress/progress.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './edulingo.db',
      entities: [
        User,
        Progress,
        Unit,
        Section,
        Option,
        OptionQuestion,
        Question,
        Session
      ],
      synchronize: false,
      logging: ['query']
    }),
    AuthzModule,
    UnitModule,
    SessionModule,
    ProgressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
