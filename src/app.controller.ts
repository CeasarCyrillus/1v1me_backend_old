import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { MatchService } from "./match/match.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly matchService: MatchService,
  ) {}

  @Get()
  getHello(): string {
    const newMatch = this.matchService.createNewMatch();
    console.log(newMatch);
    return this.matchService.findAll();
  }
}
