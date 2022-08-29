import TokenService from './tokenService';
import UserService from './userService';

class LoginService {
  private _userService: UserService;
  private _token: TokenService;
  constructor() {
    this._userService = new UserService();
    this._token = new TokenService();
  }

  public login = async (email: string, password: string) => {
    const user = await this._userService.findByEmail(email, password);
    if (!user) {
      throw new Error();
    }
    const token = this._token.create({ username: user.name, email: user.email });
    return token;
  };
}

export default LoginService;
