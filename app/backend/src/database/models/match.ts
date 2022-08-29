import { Model, INTEGER } from 'sequelize';
import db from '.';
import TeamModel from './team';

class MatchModel extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: number;
}

MatchModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: true,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: true,
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

TeamModel.belongsTo(MatchModel, { foreignKey: 'id', as: 'matches' });

MatchModel.hasMany(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchModel.hasMany(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatchModel;
