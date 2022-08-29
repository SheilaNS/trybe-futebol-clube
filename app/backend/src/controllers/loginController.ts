import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this._loginService.login(email, password);
    return res.status(200).json({ token });
  };
}

export default LoginController;
