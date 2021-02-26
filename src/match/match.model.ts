import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Match extends Model<Match> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}