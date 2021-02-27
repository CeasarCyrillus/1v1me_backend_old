import { Module } from "@nestjs/common";
import { MatchController } from "./match/match.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Match } from "./match/match.model";
import { MatchService } from "./match/match.service";
import * as config from "./config/database.dev.json";
import { MatchModule } from './match/match.module';

export const databaseModule = SequelizeModule.forRoot({
  dialect: "postgres",
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  models: [Match],
  quoteIdentifiers: false,
  logging: false,
});

@Module({
  imports: [databaseModule, MainModule, MatchModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MainModule {}
