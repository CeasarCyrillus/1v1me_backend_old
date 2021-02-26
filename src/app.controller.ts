import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MatchService } from './match/match.service';

@Controller()
export class AppController {
  private readonly appService;
  private readonly matchService;
  constructor(appService: AppService, matchService: MatchService) {
    this.appService = appService;
    this.matchService = matchService;
  }

  @Get()
  getHello(): string {
    return this.matchService.findAll();
  }
}
