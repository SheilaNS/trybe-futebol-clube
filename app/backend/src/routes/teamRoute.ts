import { Router } from 'express';
import TeamController from '../controllers/teamController';

const teamRouter = Router();

const teamController = new TeamController();

teamRouter.get('/:id', teamController.getById);
teamRouter.get('/', teamController.listAll);

export default teamRouter;
