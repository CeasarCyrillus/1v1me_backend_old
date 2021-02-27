import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { IMatch, Match } from "./match.model";
import { Sequelize } from "sequelize-typescript";
import { generateWallet } from "../utils";

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match)
    private matchModel: typeof Match,
    private database: Sequelize,
  ) {
  }

  async findAll() {
    return await this.matchModel.findAll();
  }

  async createNewMatch(
    player1Address: string,
    player1BetAmount: number = 0,
    player2BetAmount: number = 0,
  ) {
    const nanoWallet = generateWallet();
    const match: IMatch = {
      player1Address: player1Address,
      player2Address: null,

      player1PaymentRequired: player1BetAmount,
      player2PaymentRequired: player2BetAmount,

      player1PaymentDone: 0,
      player2PaymentDone: 0,

      walletAddress: nanoWallet.address,
      walletPrivateKey: nanoWallet.privateKey,
      walletPhrase: nanoWallet.passPhrase,
    };

    const transaction = await this.database.transaction();
    const savedMatch = await this.matchModel.create(match as Match, {
      transaction,
    });
    await transaction.commit();
    return savedMatch;
  }
}
