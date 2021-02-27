import { Test, TestingModule } from "@nestjs/testing";
import { MatchController } from "../../match/match.controller";
import { databaseModule } from "../../main.module";
import { MatchService } from "../../match/match.service";
import { MatchModule } from "../../match/match.module";

describe("MatchService", () => {
  let matchService: MatchService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MatchModule],
      controllers: [],
      providers: [MatchService],
    }).compile();

    matchService = app.get<MatchService>(MatchService);
  });

  it("saves match in db", async () => {
    const player1Address = "nano_34prihdxwz3u4ps8qjnn14p7ujyewkoxkwyxm3u665it8rg5rdqw84qrypzk";

    const createdMatch = await matchService.createNewMatch( player1Address );
  });
});
