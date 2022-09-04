import { Request, Response } from 'express';
import LeaderService from '../services/leaderBoardService';
import AwayLeaderService from '../services/awayLeaderBoardService';
import HomeLeaderService from '../services/homeLeaderBoardService';

class LeaderController {
  private _homeLeaderService: HomeLeaderService;
  private _awayLeaderService: AwayLeaderService;
  private _leaderService: LeaderService;

  constructor() {
    this._homeLeaderService = new HomeLeaderService();
    this._awayLeaderService = new AwayLeaderService();
    this._leaderService = new LeaderService();
  }

  public homeBoard = async (_req: Request, res: Response) => {
    const result = await this._homeLeaderService.listAll();
    res.status(200).json(result);
  };

  public awayBoard = async (_req: Request, res: Response) => {
    const result = await this._awayLeaderService.listAll();
    res.status(200).json(result);
  };

  public leaderBoard = async (_req: Request, res: Response) => {
    const result = await this._leaderService.listAll();
    res.status(200).json(result);
  };
}

export default LeaderController;
