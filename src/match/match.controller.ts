import { Body, Controller, Get, Post } from "@nestjs/common";
import { MatchService } from "./match.service";
import { wallet } from "nanocurrency-web";
import { IsNotEmpty } from 'class-validator';


export class CreateNewMatchRequest {
  @IsNotEmpty()
  player1Address: string;

  @IsNotEmpty()
  player1BetAmount: number;

  @IsNotEmpty()
  player2BetAmount: number;
}


@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  async getMatches() {
    return await this.matchService.findAll();
  }

  @Post()
  async createNewMatch(
    @Body() request: CreateNewMatchRequest,
  ): Promise<ICreateNewMatchResponse> {
    const player1Address = request.player1Address;
    const player1BetAmount = request.player1BetAmount;
    const player2BetAmount = request.player2BetAmount;

    const tempWallet = generateWallet();
    await this.matchService.createNewMatch(
      player1Address,
      player1BetAmount,
      player2BetAmount,
    );

    return {
      link: "LINK",

      player1Address: player1Address,
      player2Address: null,

      player1PaymentDone: 0,
      player2PaymentDone: 0,

      player1PaymentRequired: request.player1BetAmount,
      player2PaymentRequired: request.player2BetAmount,

      paymentAddress: tempWallet.address,
    };
  }
}

export interface ICreateNewMatchResponse {
  link: string;
  player1Address: string;
  player2Address: null;

  player1PaymentRequired: number;
  player2PaymentRequired: number;

  player1PaymentDone: number;
  player2PaymentDone: number;

  paymentAddress: string;
}

interface NanoWallet {
  address: string;
  passPhrase: string;
  privateKey: string;
}

const generateWallet = (): NanoWallet => {
  const passPhrase = wallet.generate().mnemonic;
  const newWallet = wallet.fromLegacyMnemonic(passPhrase);
  return {
    address: newWallet.accounts[0].address,
    passPhrase: newWallet.mnemonic,
    privateKey: newWallet.accounts[0].privateKey,
  };
};
