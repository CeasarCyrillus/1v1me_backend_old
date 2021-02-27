import { Test, TestingModule } from "@nestjs/testing";
import { MatchController } from "../../match/match.controller";
import { databaseModule } from "../../main.module";
import { MatchService } from "../../match/match.service";
import { MatchModule } from "../../match/match.module";

describe("MatchController", () => {
  let matchController: MatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [databaseModule, MatchModule],
      controllers: [MatchController],
      providers: [MatchService],
    }).compile();

    matchController = app.get<MatchController>(MatchController);
  });

  it("returns new wallet address when creating match", async () => {
    const player1Address = "nano_34prihdxwz3u4ps8qjnn14p7ujyewkoxkwyxm3u665it8rg5rdqw84qrypzk";

    const createdMatch = await matchController.createNewMatch({ player1Address: player1Address });

    expect(createdMatch.paymentAddress.startsWith("nano_")).toBeTruthy();
    expect(createdMatch.paymentAddress.length).toBe(65);
  });
});
