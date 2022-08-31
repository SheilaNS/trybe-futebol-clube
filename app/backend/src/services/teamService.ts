import TeamModel from '../database/models/team';

class TeamService {
  public listAll = async () => {
    const teams = await TeamModel.findAll();
    return teams;
  };
}

export default TeamService;
