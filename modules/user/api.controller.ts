import { Request, Response, NextFunction } from 'express';
import UserService from './service';

export default class UserApiController {
  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user.dataValues;
      res.status(201).json({
        success: true,
        message: 'Success Get User',
        data: await UserService.getById(userId)
      });
    } catch (error) {
      next(error);
    }
  }

  static async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user.dataValues;
      res.status(200).json({
        success: true,
        message: 'Success login',
        data: await UserService.editUser(req.body, userId)
      });
    } catch (error) {
      next(error);
    }
  }
}
