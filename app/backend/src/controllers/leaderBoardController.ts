import { Request, Response } from 'express';
import LeaderService from '../services/leaderBoardService';

class LeaderController {
  private _leaderService: LeaderService;

  constructor() {
    this._leaderService = new LeaderService();
  }

  public homeBoard = async (_req: Request, res: Response) => {
    const result = await this._leaderService.listAll();
    res.status(200).json(result);
  };
}

export default LeaderController;
