import { Request, Response, NextFunction } from 'express';
import AuthService from './service';

export default class AuthApiController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.register(req.body);
      res.status(201).json({
        success: true,
        message: 'Success register'
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        success: true,
        message: 'Success login',
        data: await AuthService.login({
          email: req.body.email,
          password: req.body.password
        })
      });
    } catch (error) {
      next(error);
    }
  }
}
