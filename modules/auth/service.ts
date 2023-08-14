import { checkPassword, hashPassword } from '../../utils/hashing';
import { BodyRegisterType } from '../../types/BodyRegisterType';
import { BodyLoginType } from '../../types/BodyLoginType';
import { ModelAuthType } from '../../types/ModelAuthType';
import { generateToken } from '../../utils/jwt';
import UserService from '../user/service';
import db from '../../models';

const Auth = db.auth;

export default class AuthService {
  static async register(body: BodyRegisterType) {
    const exist = await UserService.getByEmail({
      email: body.email
    });
    if (exist?.dataValues !== undefined) {
      throw {
        status: 400,
        message: 'Email already registered!'
      };
    }
    try {
      const userSave = await UserService.addUser(body);
      await this.addAuth({
        ...body,
        userId: userSave.id,
        password: hashPassword(body.password)
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async login(body: BodyLoginType) {
    try {
      const exist = await this.getByEmail({ email: body.email });
      if (exist?.dataValues === undefined) {
        throw {
          status: 400,
          message: 'User not exist'
        };
      }
      if (!checkPassword(body.password, exist?.dataValues?.password)) {
        throw {
          status: 400,
          message: 'Email or password incorrect!'
        };
      }
      const user = await UserService.getById({
        userId: exist.dataValues.userId
      });
      const token = generateToken(user.dataValues, '1h');
      const refreshToken = generateToken(user.dataValues, '1d');
      return { token, refreshToken };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getByEmail({ email }: { email: string }) {
    return await Auth.findOne({ where: { email } });
  }

  static async addAuth(body: ModelAuthType) {
    return await Auth.create(body);
  }
}
