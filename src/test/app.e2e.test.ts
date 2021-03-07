import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { MainModule } from "../main.module";
import { MatchService } from "../match/match.service";
import {
  CreateNewMatchRequest,
  CreateNewMatchResponse,
  GetMatchResponse,
} from "../match/match.controller";
import { IMatch } from "../match/match.model";

describe("AppController (e2e)", () => {
  const PLAYER_1_ADDRESS =
    "nano_34prihdxwz3u4ps8qjnn14p7ujyewkoxkwyxm3u665it8rg5rdqw84qrypzk";
  const PLAYER_1_INVALID_ADDRESS = "not-valid-address";
  const PAYMENT_ADDRESS =
    "nano_98prihdxwz3u4ps8qjnn14p7ujyewkoxkwyxm3u665it8rg5rdqw84qrypzk";

  let app: INestApplication;

  let mockedMatchService: { createNewMatch: any; getMatch: any };

  beforeEach(async () => {
    const matchToReturn: IMatch = {
      player1PaymentDone: 0,
      player2PaymentDone: 0,

      player1PaymentRequired: 10,
      player2PaymentRequired: 5,

      player1Address: PLAYER_1_ADDRESS,
      player2Address: null,

      walletAddress: PAYMENT_ADDRESS,
      walletPhrase: "",
      walletPrivateKey: "",

      player1MatchId: "A98D97890A9KJ64AM9NA08J",
      player2MatchId: "B13G71K90A9KJ64AM9NA07K",
    };

    mockedMatchService = {
      createNewMatch: jest.fn(() => {
        return Promise.resolve(matchToReturn);
      }),

      getMatch: jest.fn(() => {
        return Promise.resolve(matchToReturn);
      }),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
      exports: [],
      providers: [],
    })
      .overrideProvider(MatchService)
      .useValue(mockedMatchService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Create a new match accepted", async () => {
    const requestBody: CreateNewMatchRequest = {
      player1Address: PLAYER_1_ADDRESS,
      player1BetAmount: 10,
      player2BetAmount: 5,
    };

    await request(app.getHttpServer())
      .post("/match")
      .send(requestBody)
      .expect(201)
      .expect((response) => {
        const body: CreateNewMatchResponse = response.body;
        expectMatchToBeInResponse(body);
      });

    expect(mockedMatchService.createNewMatch).toHaveBeenCalledTimes(1);

    const parameters = mockedMatchService.createNewMatch.mock.calls[0];
    expect(parameters).toEqual([
      requestBody.player1Address,
      requestBody.player1BetAmount,
      requestBody.player2BetAmount,
    ]);
  });

  it("get match accepted", async () => {
    await request(app.getHttpServer())
      .get("/match/A98D97890A9KJ64AM9NA08J")
      .expect(200)
      .expect((response) => {
        const body: GetMatchResponse = response.body;
        expectMatchToBeInResponse(body);
      });

    expect(mockedMatchService.getMatch).toHaveBeenCalledWith(
      "A98D97890A9KJ64AM9NA08J",
    );
  });

  it("Create a new match rejected because body is empty", async () => {
    const requestBody = {};

    await request(app.getHttpServer())
      .post("/match")
      .send(requestBody)
      .expect(400);

    expect(mockedMatchService.createNewMatch).not.toHaveBeenCalled();
  });

  it("Create a new match rejected because nano address is invalid", async () => {
    const requestBody: CreateNewMatchRequest = {
      player1Address: PLAYER_1_INVALID_ADDRESS,
      player1BetAmount: 10,
      player2BetAmount: 5,
    };

    await request(app.getHttpServer())
      .post("/match")
      .send(requestBody)
      .expect(400);

    expect(mockedMatchService.createNewMatch).not.toHaveBeenCalled();
  });

  const expectMatchToBeInResponse = (body: GetMatchResponse) => {
    expect(body.player1Address).toEqual(PLAYER_1_ADDRESS);
    expect(body.player1PaymentRequired).toEqual(10);
    expect(body.player2PaymentRequired).toEqual(5);

    expect(body.player1PaymentDone).toEqual(0);
    expect(body.player2PaymentDone).toEqual(0);

    expect(body.paymentAddress).toEqual(PAYMENT_ADDRESS);

    expect(body.player1MatchId).toHaveLength(23);
    expect(body.player2MatchId).toHaveLength(23);
    expect(body.player1MatchId).not.toEqual(body.player2MatchId);
  };
});
