import 'dotenv/config';
import { sign } from 'jsonwebtoken';

class TokenService {
  public create = (data: {
    username: string;
    email: string;
  }) => {
    const { username, email } = data;
    const payload = { username, email };
    const secret = process.env.JWT_SECRET as string;
    const token = sign(payload, secret);
    return token;
  };
}

export default TokenService;
