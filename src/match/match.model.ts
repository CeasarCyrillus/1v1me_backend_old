import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";

export interface IMatch {
  player1Address: string;
  player2Address: string;

  player1PaymentRequired: number;
  player2PaymentRequired: number;

  player1PaymentDone: number;
  player2PaymentDone: number;

  walletPhrase: string;
  walletPrivateKey: string;
  walletAddress: string;

  player1MatchId: string;
  player2MatchId: string
}

@Table
export class Match extends Model<Match> implements IMatch{
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @Column
  player1Address: string;
  @Column
  player2Address: string;

  @Column
  player1PaymentRequired: number;
  @Column
  player2PaymentRequired: number;

  @Column
  player1PaymentDone: number;
  @Column
  player2PaymentDone: number;

  @Column
  walletPhrase: string;
  @Column
  walletPrivateKey: string;
  @Column
  walletAddress: string;

  @Column
  player1MatchId: string;
  @Column
  player2MatchId: string;
}
