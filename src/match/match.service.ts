import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Match } from './match.model';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match)
    private matchModel: typeof Match,
  ) {
  }

  findAll() {
    return this.matchModel.findAll();
  }

  findOne(id: string) {
    return this.matchModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    const match = await this.findOne(id);
    await match.destroy();
  }
}