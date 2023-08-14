import { BodyRegisterType } from '../../types/BodyRegisterType';
import db from '../../models';

const User = db.user;

export default class UserService {
  static async getByEmail({ email }: { email: string }) {
    return await User.findOne({ where: { email } });
  }

  static async getById({ userId }: { userId: number }) {
    return await User.findOne({ where: { id: userId } });
  }

  static async addUser(body: BodyRegisterType) {
    return await User.create(body);
  }
}
