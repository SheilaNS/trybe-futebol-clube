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

  public findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const matches = await this._matchService.listAll();
      res.status(200).json(matches);
    }
    const matches = await this._matchService.filterByProgress(JSON.parse(inProgress as string));
    res.status(200).json(matches);
  };

  public addMatch = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
      const err = new Error();
      err.name = 'UnauthorizedError';
      err.message = 'Invalid token';
      throw err;
    }
    await this._tokenService.verify(token);
    const matchData = req.body;
    matchData.inProgress = true;
    const newMatch = await this._matchService.saveMatch(matchData);
    res.status(201).json(newMatch);
  };
}

export default MatchController;
