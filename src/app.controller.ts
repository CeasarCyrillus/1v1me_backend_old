import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { MatchService } from "./match/match.service";
import { Match } from "./match/match.model";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly matchService: MatchService,
  ) {}

  @Get()
  async getHello(): Promise<Match[]> {
    await this.matchService.createNewMatch();
    return this.matchService.findAll();
  }
}
