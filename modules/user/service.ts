import { UserType } from '../../types/UserType';
import db from '../../models';

const User = db.user;

export default class UserService {
  static async getByEmail({ email }: { email: string }) {
    return await User.findOne({ where: { email } });
  }

  static async getById({ userId }: { userId: number }) {
    return await User.findOne({ where: { id: userId } });
  }

  static async addUser(body: UserType) {
    return await User.create(body);
  }

  static async editUser(body: UserType, userId: number) {
    await User.update(body, { where: { id: userId } });
  }
}
