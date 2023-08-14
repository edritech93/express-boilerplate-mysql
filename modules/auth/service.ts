import { checkPassword, hashPassword } from '../../utils/hashing';
import { BodyRegisterType } from '../../types/BodyRegisterType';
import { BodyLoginType } from '../../types/BodyLoginType';
import { generateToken } from '../../utils/jwt';
import UserService from '../user/service';
import db from '../../models';

const User = db.user;
const Auth = db.auth;

export default class AuthenticationService {
  static async register(body: BodyRegisterType) {
    const exist = await UserService.getByEmail({
      email: body.email
    });
    if (exist) {
      throw {
        success: 400,
        message: 'Email already registered!'
      };
    }
    try {
      const userSave = await User.create(body);
      await Auth.create({
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
      const exist = await UserService.getByEmail({
        email: body.email
      });
      if (!exist) {
        throw {
          success: 400,
          message: 'Email or password incorrect!'
        };
      }
      if (!checkPassword(body.password, exist.password)) {
        throw {
          status: 400,
          message: 'Email or password incorrect!'
        };
      }
      const token = generateToken(
        {
          email: body.email
        },
        '1d'
      );
      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
