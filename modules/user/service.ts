import db from '../../models';

const User = db.user;

export default class UserService {
  static async getByEmail({ email }: { email: string }) {
    return await User.findOne({
      email
    });
  }
}
