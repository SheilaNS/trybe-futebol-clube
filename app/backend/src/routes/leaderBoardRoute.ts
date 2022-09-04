import { Router } from 'express';
import LeaderController from '../controllers/leaderBoardController';

const leaderRouter = Router();

const leaderController = new LeaderController();

leaderRouter.get('/home', leaderController.homeBoard);
leaderRouter.get('/away', leaderController.awayBoard);
leaderRouter.get('/', leaderController.leaderBoard);

export default leaderRouter;
