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
      err.message = 'There is no team with such id!';
      throw err;
    }
    return team;
  };
}

export default TeamService;
