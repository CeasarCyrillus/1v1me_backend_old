import { Test, TestingModule } from "@nestjs/testing";
import { MatchController } from "../../match/matchController";
import { databaseModule } from "../../main.module";
import { MatchService } from "../../match/match.service";
import { MatchModule } from "../../match/match.module";

describe("MatchController", () => {
  let appController: MatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [databaseModule, MatchModule],
      controllers: [MatchController],
      providers: [MatchService],
    }).compile();

    appController = app.get<MatchController>(MatchController);
  });

  describe("root", () => {
    it("should return empty list", async () => {
      const matches = await appController.getMatches();
      expect(matches).toEqual([]);
    });
  });
});
