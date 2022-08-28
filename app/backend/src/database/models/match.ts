import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './team';
// import OtherModel from './OtherModel';

class Match extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: number;
}

Match.init({
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

Team.belongsTo(Match, { foreignKey: 'id', as: 'matches' });

Match.hasMany(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.hasMany(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
