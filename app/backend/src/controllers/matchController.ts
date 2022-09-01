import { Request, Response } from 'express';
import TokenService from '../services/tokenService';
import MatchService from '../services/matchService';

class MatchController {
  private _matchService: MatchService;
  private _tokenService: TokenService;

  constructor() {
    this._matchService = new MatchService();
    this._tokenService = new TokenService();
  }

  public findAll = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matches = await this._matchService.listAll();
      res.status(200).json(matches);
      return;
    }
    const matches = await this._matchService.filterByProgress(JSON.parse(inProgress as string));
    res.status(200).json(matches);
  };

  public addMatch = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    await this._tokenService.verify(token);
    const matchData = req.body;
    matchData.inProgress = true;
    const newMatch = await this._matchService.saveMatch(matchData);
    res.status(201).json(newMatch);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const finish = await this._matchService.finishMatch(id);
    res.status(200).json(finish);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const matchData = req.body;
    const updated = await this._matchService.updateMatch(id, matchData);
    res.status(200).json(updated);
  };
}

export default MatchController;
