import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Match } from './match.model';

@Module({
  imports: [SequelizeModule.forFeature([Match])],
  exports: [SequelizeModule], // TODO: should be MatchService
})
export class MatchModule {}