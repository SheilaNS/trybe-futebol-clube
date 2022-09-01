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
}

export default MatchService;
