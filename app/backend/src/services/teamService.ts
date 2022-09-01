import TeamModel from '../database/models/team';

class TeamService {
  public listAll = async () => {
    const teams = await TeamModel.findAll();
    return teams;
  };

  public getById = async (id: string) => {
    const team = await TeamModel.findByPk(id);
    if (!team) {
      const err = new Error();
      err.name = 'NotFoundError';
      err.message = 'Team not found';
      throw err;
    }
    return team;
  };
}

export default TeamService;
