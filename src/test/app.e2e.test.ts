import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from "supertest";
import { MainModule } from "../main.module";
import { MatchService } from "../match/match.service";
import {
  CreateNewMatchRequest,
  ICreateNewMatchResponse,
} from "../match/match.controller";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  const mockedMatchService = { createNewMatch: jest.fn((params) => params) };

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
  })

  it("Create a new match accepted", async () => {
    const requestBody: CreateNewMatchRequest = {
      player1Address:
        "nano_34prihdxwz3u4ps8qjnn14p7ujyewkoxkwyxm3u665it8rg5rdqw84qrypzk",
      player1BetAmount: 10,
      player2BetAmount: 5,
    };

    await request(app.getHttpServer())
      .post("/")
      .send(requestBody)
      .expect(201)
      .expect((response) => {
        const body: ICreateNewMatchResponse = response.body;
        expect(body.link).not.toBeNull();
        expect(body.player1Address).toEqual(requestBody.player1Address);
        expect(body.player1PaymentRequired).toEqual(
          requestBody.player1BetAmount,
        );
        expect(body.player2PaymentRequired).toEqual(
          requestBody.player2BetAmount,
        );

        expect(body.player1PaymentDone).toEqual(0);
        expect(body.player2PaymentDone).toEqual(0);

        expect(body.paymentAddress.startsWith("nano_")).toBeTruthy();
      });

    expect(mockedMatchService.createNewMatch).toHaveBeenCalledTimes(1);

    const parameters = mockedMatchService.createNewMatch.mock.calls[0];
    expect(parameters).toEqual([
      requestBody.player1Address,
      requestBody.player1BetAmount,
      requestBody.player2BetAmount,
    ]);
  });

  it("Create a new match rejected BAD_REQUEST", async () => {
    const requestBody = {};

    await request(app.getHttpServer())
      .post("/")
      .send(requestBody)
      .expect(400);

    expect(mockedMatchService.createNewMatch).not.toHaveBeenCalled();
  });
});
