import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

class TokenService {
  public create = (data: {
    name: string;
    role: string;
    email: string;
  }) => {
    const { name, email, role } = data;
    const payload = { name, email, role };
    const token = sign(payload, secret);
    return token;
  };

  public verify = (token: string) => {
    const result = verify(token, secret);
    return result;
  };
}

export default TokenService;
