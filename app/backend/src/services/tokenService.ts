import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import errorCreate from '../middlewares/errorCreate';

const secret = process.env.JWT_SECRET || 'jwt_secret';

class TokenService {
  public create = async (data: {
    username: string;
    role: string;
    email: string;
  }) => {
    const { username, email, role } = data;
    const payload = { username, email, role };
    const token = sign(payload, secret);
    return token;
  };

  public verify = async (token: string | undefined) => {
    if (!token) {
      const err = new Error();
      err.name = 'UnauthorizedError';
      err.message = 'Token must be a valid token';
      throw err;
    }
    try {
      const result = verify(token, secret);
      return result;
    } catch (error) {
      throw errorCreate('UnauthorizedError', 'Token must be a valid token');
    }
  };
}

export default TokenService;
