import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Match } from './match/match.model';
import { MatchService } from './match/match.service';
import { MatchModule } from './match/match.module';
import * as config from "./config/database.dev.json"

export const databaseModule = SequelizeModule.forRoot({
  dialect: "postgres",
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  models: [Match],
  quoteIdentifiers: false
});

@Module({
  imports: [databaseModule, MatchModule],
  controllers: [AppController],
  providers: [AppService, MatchService],
})
export class AppModule {}
