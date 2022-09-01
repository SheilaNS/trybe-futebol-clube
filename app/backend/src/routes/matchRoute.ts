import { Router } from 'express';
import MatchController from '../controllers/matchController';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.patch('/:id/finish', matchController.finishMatch);
matchRouter.patch('/:id', matchController.updateMatch);
matchRouter.post('/', matchController.addMatch);
matchRouter.get('/', matchController.findAll);

export default matchRouter;
