import { Router } from 'express';
import MatchController from '../controllers/matchController';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', matchController.findAll);

export default matchRouter;
