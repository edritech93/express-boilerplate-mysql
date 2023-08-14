import { BodyRegisterType } from '../../types/BodyRegisterType';
import db from '../../models';

const User = db.user;

export default class UserService {
  static async getByEmail({ email }: { email: string }) {
    return await User.findOne({
      email
    });
  }

  static async getById({ userId }: { userId: string }) {
    return await User.findOne({
      id: userId
    });
  }

  static async addUser(body: BodyRegisterType) {
    return await User.create(body);
  }
}
