import { Request, Response } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  private _matchService: MatchService;

  constructor() {
    this._matchService = new MatchService();
  }

  public findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const matches = await this._matchService.listAll();
      res.status(200).json(matches);
    }
    const matches = await this._matchService.filterByProgress(JSON.parse(inProgress as string));
    res.status(200).json(matches);
  };
}

export default MatchController;
