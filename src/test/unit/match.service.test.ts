import { Test, TestingModule } from "@nestjs/testing";
import { MatchService } from "../../match/match.service";
import { MatchModule } from "../../match/match.module";
import { setupDatabase } from '../../utils';
import { testDatabaseModule } from '../utils';
import { Sequelize } from 'sequelize-typescript';
import { Match } from '../../match/match.model';

describe("MatchService", () => {
  let matchService: MatchService;
  let database: Sequelize;

  beforeAll(async () => {
    await setupDatabase("test");
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MatchModule, testDatabaseModule],
      controllers: [],
      providers: [MatchService],
    }).compile();

    matchService = app.get<MatchService>(MatchService);
    database = app.get<Sequelize>(Sequelize);
  });

  afterEach(async () => {
    await Match.destroy({
      where: {},
      truncate: true
    })
  });

  it("saves match and wallet in db", async () => {
    const player1Address =
      "nano_34prihdxwz3u4ps8qjnn14p7ujyewkoxkwyxm3u665it8rg5rdqw84qrypzk";

    const createdMatch = await matchService.createNewMatch(player1Address, 100, 150);

    expect(createdMatch.walletAddress.length).toBe(65);


    expect(createdMatch.player1Address).toEqual(player1Address);
    expect(createdMatch.player2Address).toBeNull();

    expect(createdMatch.player1PaymentRequired).toEqual(100);
    expect(createdMatch.player2PaymentRequired).toEqual(150);

    expect(createdMatch.walletAddress.length).toBe(65);
    expect(createdMatch.walletPrivateKey.length).toBe(64);
    expect(createdMatch.walletPhrase.split(" ").length).toBe(24);
  });
});
