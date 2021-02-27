import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { IMatch, Match } from "./match.model";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match)
    private matchModel: typeof Match,
    private database: Sequelize,
  ) {}

  async findAll() {
    return await this.matchModel.findAll();
  }

  async createNewMatch(
    player1Address: string,
    player1BetAmount: number = 0,
    player2BetAmount: number = 0,
  ) {
    const match: IMatch = {
      player1Address: player1Address,
      player1PaymentDone: 0,
      player1PaymentRequired: 0,
      player2Address: "",
      player2PaymentDone: 0,
      player2PaymentRequired: 0,
      walletAddress: "",
      walletPrivateKey: "",
      walletPhrase: "",
    };

    const transaction = await this.database.transaction();
    const savedMatch = await this.matchModel.create(match as Match, {
      transaction,
    });
    await transaction.commit();
    return savedMatch;
  }
}
