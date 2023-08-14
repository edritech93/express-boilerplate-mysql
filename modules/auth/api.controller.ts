import { Request, Response, NextFunction } from 'express';
import AuthenticationService from './service';

export default class AuthApiController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthenticationService.register(req.body);
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
        data: await AuthenticationService.login({
          email: req.body.email,
          password: req.body.password
        })
      });
    } catch (error) {
      next(error);
    }
  }
}
