import { Request, Response } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  private _teamService: TeamService;

  constructor() {
    this._teamService = new TeamService();
  }

  public listAll = async (_req: Request, res: Response) => {
    const teams = await this._teamService.listAll();
    res.status(200).json(teams);
  };
}

export default TeamController;
