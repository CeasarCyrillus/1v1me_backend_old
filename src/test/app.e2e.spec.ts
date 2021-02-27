import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { MainModule } from "../main.module";
import { MatchService } from "../match/match.service";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  const mockedMatchService = { createNewMatch: jest.fn() };

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
    await app.init();
  });

  it("/ (POST)", async () => {
    const player1Address =
      "nano_34prihdxwz3u4ps8qjnn14p7ujyewkoxkwyxm3u665it8rg5rdqw84qrypzk";

    await request(app.getHttpServer())
      .post("/")
      .send({ player1Address: player1Address })
      .expect(201)
      .expect((response) => {
        expect(response.body.paymentAddress.startsWith("nano_")).toBeTruthy();
      });

    expect(mockedMatchService.createNewMatch).toHaveBeenCalledTimes(1);
  });
});
