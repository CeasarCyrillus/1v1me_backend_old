import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Match } from "./match.model";
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

  async createNewMatch(player1Address: string) {
    const transaction = await this.database.transaction();
    const match = await this.matchModel.create(
      { player1Address: player1Address } as Match,
      { transaction },
    );
    await transaction.commit();
    return match;
  }
}
