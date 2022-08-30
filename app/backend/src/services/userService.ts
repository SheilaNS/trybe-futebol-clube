import UserModel from '../database/models/user';

class UserService {
  public findByEmail = async (email: string) => {
    const user = await UserModel.findOne({
      where: { email },
      raw: true,
    });
    return user;
  };
}

export default UserService;
