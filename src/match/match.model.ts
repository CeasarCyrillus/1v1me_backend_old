import { AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';

export class BaseTable<T> extends Model<T> {
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

@Table
export class Match extends BaseTable<Match> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @Column
  player1Address: string;
}

