import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    await this._loginService.loginValidate(email, password);
    const token = await this._loginService.login(email, password);
    res.status(200).json({ token });
  };
}

export default LoginController;
