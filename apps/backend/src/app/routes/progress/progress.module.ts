import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress } from '../../model/progress';
import { JwtStrategy } from '../../auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Progress])],
  providers: [ProgressService,JwtStrategy],
  controllers: [ProgressController]
})
export class ProgressModule {}
