import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Match extends Model<Match> {
  @Column
  player1Address: string;
}
