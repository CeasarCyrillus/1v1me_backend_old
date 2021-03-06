import { Body, Controller, Get, Post } from "@nestjs/common";
import { MatchService } from "./match.service";
import { IsNotEmpty } from "class-validator";
import { IsNanoAddress } from "../validators";

export class CreateNewMatchRequest {
  @IsNanoAddress()
  player1Address: string;

  @IsNotEmpty()
  player1BetAmount: number;

  @IsNotEmpty()
  player2BetAmount: number;
}

@Controller("/match")
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  async getMatches() {
    return await this.matchService.findAll();
  }

  @Post()
  async createNewMatch(
    @Body() request: CreateNewMatchRequest,
  ): Promise<CreateNewMatchResponse> {
    const player1Address = request.player1Address;
    const player1BetAmount = request.player1BetAmount;
    const player2BetAmount = request.player2BetAmount;

    const match = await this.matchService.createNewMatch(
      player1Address,
      player1BetAmount,
      player2BetAmount,
    );

    return {
      player1Address: match.player1Address,
      player2Address: null,

      player1PaymentDone: 0,
      player2PaymentDone: 0,

      player1PaymentRequired: match.player1PaymentRequired,
      player2PaymentRequired: match.player2PaymentRequired,

      paymentAddress: match.walletAddress,

      player1MatchId: match.player1MatchId,
      player2MatchId: match.player2MatchId,
    };
  }
}

export interface CreateNewMatchResponse {
  player1Address: string;
  player2Address: null;

  player1PaymentRequired: number;
  player2PaymentRequired: number;

  player1PaymentDone: number;
  player2PaymentDone: number;

  paymentAddress: string;

  player1MatchId: string;
  player2MatchId: string;
}
