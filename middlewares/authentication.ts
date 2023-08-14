import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import UserService from '../modules/user/service';

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization)
      throw {
        status: 401,
        message: 'You are not authorized!'
      };

    const token = req.headers.authorization.split(' ');

    if (token[0]?.toLowerCase() !== 'bearer')
      throw {
        status: 401,
        message: 'You are not authorized!'
      };

    const decoded: any = verifyToken(token[1]);

    const user = await UserService.getByEmail({
      email: decoded.email
    });

    if (!user)
      throw {
        status: 404,
        message: 'Data not found'
      };

    req.classified = {
      email: user.email,
      id: user.id
    };

    next();
  } catch (error) {
    next({
      error
    });
  }
}
