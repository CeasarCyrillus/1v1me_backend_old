import { Controller, Get } from "@nestjs/common";
import { MatchService } from "./match/match.service";

@Controller()
export class AppController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  async getMatches() {
    return await this.matchService.findAll();
  }
}
