import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';

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
      err.message = 'Invalid token';
      throw err;
    }
    const result = verify(token, secret);
    return result;
  };
}

export default TokenService;
