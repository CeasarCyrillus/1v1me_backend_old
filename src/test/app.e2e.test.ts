import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { MainModule } from "../main.module";
import { MatchService } from "../match/match.service";
import {
  CreateNewMatchRequest,
  CreateNewMatchResponse,
} from "../match/match.controller";

describe("AppController (e2e)", () => {
  const PLAYER_1_ADDRESS =
    "nano_34prihdxwz3u4ps8qjnn14p7ujyewkoxkwyxm3u665it8rg5rdqw84qrypzk";
  const PLAYER_1_INVALID_ADDRESS = "not-valid-address";
  const PAYMENT_ADDRESS =
    "nano_98prihdxwz3u4ps8qjnn14p7ujyewkoxkwyxm3u665it8rg5rdqw84qrypzk";

  let app: INestApplication;
  const mockedMatchService = {
    createNewMatch: jest.fn(() => {
      return {
        player1Address: PLAYER_1_ADDRESS,
        player1PaymentRequired: 10,
        player2PaymentRequired: 5,
        walletAddress: PAYMENT_ADDRESS,
      };
    }),
  };

  beforeEach(async () => {
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
        expect(body.link).toEqual("/match/6577033808677713");
        expect(body.player1Address).toEqual(requestBody.player1Address);
        expect(body.player1PaymentRequired).toEqual(
          requestBody.player1BetAmount,
        );
        expect(body.player2PaymentRequired).toEqual(
          requestBody.player2BetAmount,
        );

        expect(body.player1PaymentDone).toEqual(0);
        expect(body.player2PaymentDone).toEqual(0);

        expect(body.paymentAddress).toEqual(PAYMENT_ADDRESS);
      });

    expect(mockedMatchService.createNewMatch).toHaveBeenCalledTimes(1);

    const parameters = mockedMatchService.createNewMatch.mock.calls[0];
    expect(parameters).toEqual([
      requestBody.player1Address,
      requestBody.player1BetAmount,
      requestBody.player2BetAmount,
    ]);
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
});
