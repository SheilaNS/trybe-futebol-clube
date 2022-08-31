import { compare } from 'bcryptjs';
import TokenService from './tokenService';
import UserService from './userService';

class LoginService {
  private _userService: UserService;
  private _token: TokenService;

  constructor() {
    this._userService = new UserService();
    this._token = new TokenService();
  }

  public loginValidate = async (email: string, password: string) => {
    if (!email || !password) {
      const err = new Error();
      err.name = 'ValidationError';
      err.message = 'All fields must be filled';
      throw err;
    }
  };

  public login = async (email: string, password: string) => {
    const user = await this._userService.findByEmail(email);
    if (!user) {
      const err = new Error();
      err.name = 'UnauthorizedError';
      err.message = 'Incorrect email or password';
      throw err;
    }
    const validPass = await compare(password, user.password);
    if (!validPass) {
      const err = new Error();
      err.name = 'UnauthorizedError';
      err.message = 'Incorrect email or password';
      throw err;
    }
    const token = this._token.create(user);
    return token;
  };

  public validate = async (token: string) => {
    const tokenOk = await this._token.verify(token);
    return tokenOk as { email: string, role: string };
  };
}

export default LoginService;
