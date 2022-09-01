import TeamModel from '../database/models/team';
import MatchModel from '../database/models/match';
import TeamService from './teamService';
import errorCreate from '../middlewares/errorCreate';

const UNAUT = 'UnauthorizedError';
class MatchService {
  private _teamService: TeamService;

  constructor() {
    this._teamService = new TeamService();
  }

  public listAll = async () => {
    const matches = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  };

  public filterByProgress = async (inProgress: boolean) => {
    const matches = await MatchModel.findAll({
      where: { inProgress },
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  };

  public saveMatch = async (matchData: {
    homeTeam: number;
    awayTeam: number;
    homeTeamGoals: number;
    awayTeamGoals: number;
    inProgress: boolean;
  }) => {
    if (matchData.homeTeam === matchData.awayTeam) {
      throw errorCreate(UNAUT, 'It is not possible to create a match with two equal teams');
    }
    await this._teamService.getById(String(matchData.homeTeam));
    await this._teamService.getById(String(matchData.awayTeam));
    const add = await MatchModel.create(matchData);
    return add;
  };

  public finishMatch = async (id: string) => {
    const exists = await MatchModel.findByPk(id);
    if (!exists) {
      throw errorCreate('NotFoundError', 'Match not found');
    }
    const ok = await MatchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    if (ok[0] === 1) {
      return { message: 'Finished' };
    }
    return { message: 'Match already finished' };
  };

  public updateMatch = async (id: string, matchData: {
    homeTeamGoals: number;
    awayTeamGoals: number;
  }) => {
    const exists = await MatchModel.findByPk(id);
    if (!exists) {
      throw errorCreate('NotFoundError', 'Match not found');
    }
    const ok = await MatchModel.update(
      matchData,
      { where: { id } },
    );
    if (ok[0] === 1) {
      return matchData;
    }
    return { message: 'Match already updated' };
  };
}

export default MatchService;
