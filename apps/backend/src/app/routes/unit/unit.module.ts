import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from '../../model/unit';
@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  providers: [UnitService],
  controllers: [UnitController]
})
export class UnitModule {}
