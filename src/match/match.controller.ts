import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { MatchService } from "./match.service";
import { IsNotEmpty } from "class-validator";
import { IsNanoAddress } from "../validators";
import { Request } from 'express';
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";

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

  @Get(":matchId")
  async getMatch(@Param() params: {matchId: string}): Promise<GetMatchResponse> {
    const match = await this.matchService.getMatch(params.matchId);
    return {
      player1Address: match.player1Address,
      player2Address: match.player2Address,

      player1PaymentDone: 0,
      player2PaymentDone: 0,

      player1PaymentRequired: match.player1PaymentRequired,
      player2PaymentRequired: match.player2PaymentRequired,

      paymentAddress: match.walletAddress,

      player1MatchId: match.player1MatchId,
      player2MatchId: match.player2MatchId,
    };
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

export type CreateNewMatchResponse = GetMatchResponse;
export interface GetMatchResponse {
  player1Address: string;
  player2Address: string | null;

  player1PaymentRequired: number;
  player2PaymentRequired: number;

  player1PaymentDone: number;
  player2PaymentDone: number;

  paymentAddress: string;

  player1MatchId: string;
  player2MatchId: string;
}