import * as express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import leaderRouter from './routes/leaderBoardRoute';
import loginRouter from './routes/loginRoute';
import matchRouter from './routes/matchRoute';
import teamRouter from './routes/teamRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use('/leaderboard', leaderRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/matches', matchRouter);
    this.app.use('/teams', teamRouter);

    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
