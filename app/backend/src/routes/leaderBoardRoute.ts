import { Router } from 'express';
import LeaderController from '../controllers/leaderBoardController';

const leaderRouter = Router();

const leaderController = new LeaderController();

leaderRouter.get('/home', leaderController.homeBoard);

export default leaderRouter;
