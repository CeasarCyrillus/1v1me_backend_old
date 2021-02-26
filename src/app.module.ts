import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Match } from './match/match.model';
import { MatchService } from './match/match.service';
import { MatchModule } from './match/match.module';

export const databaseModule = SequelizeModule.forRoot({
  dialect: "postgres",
  host: 'localhost',
  port: 5432,
  username: 'ceasarcyrillus',
  password: '',
  database: 'ceasarcyrillus',
  models: [Match],
});

@Module({
  imports: [databaseModule, MatchModule],
  controllers: [AppController],
  providers: [AppService, MatchService],
})
export class AppModule {}
