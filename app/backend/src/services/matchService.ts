import TeamModel from '../database/models/team';
import MatchModel from '../database/models/match';

class MatchService {
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
    const add = await MatchModel.create(matchData);
    return add;
  };

  public finishMatch = async (id: string) => {
    const exists = await MatchModel.findByPk(id);
    if (!exists) {
      const err = new Error();
      err.name = 'NotFoundError';
      err.message = 'Match not found';
      throw err;
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
}

export default MatchService;
