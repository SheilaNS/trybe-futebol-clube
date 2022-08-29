import UserModel from '../database/models/user';

class UserService {
  public findByEmail = async (email: string, password: string) => {
    const user = await UserModel.findOne({
      where: { email, password },
      raw: true,
    });
    return user;
  };
}

export default UserService;
