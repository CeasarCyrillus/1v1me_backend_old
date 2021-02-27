import { Module } from "@nestjs/common";
import { MatchController } from "./match/match.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Match } from "./match/match.model";
import { MatchService } from "./match/match.service";
import * as config from "../config/config.json";
import { MatchModule } from './match/match.module';

export const devDatabaseModule = SequelizeModule.forRoot({
  dialect: "postgres",
  host: config.database.dev.host,
  port: config.database.dev.port,
  username: config.database.dev.user,
  password: config.database.dev.password,
  database: config.database.dev.database,
  models: [Match],
  quoteIdentifiers: false,
  logging: false,
});


@Module({
  imports: [devDatabaseModule, MainModule, MatchModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MainModule {}
