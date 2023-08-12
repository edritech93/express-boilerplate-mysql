import { Request, Response } from 'express';
import {
  DATA_NOT_FOUND,
  TIME_AGE_ACCESS_TOKEN,
  TIME_AGE_REFRESH_TOKEN
} from '../constants';
import { Password } from '../utils/password';
import db from '../models';

const Profile = db.user;
const Auth = db.auth;

export const register = (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;
  Profile.create(req.body)
    .then((data) => {
      const passwordHash = Password.hashPassword(password);
      const body = {
        username: phoneNumber,
        password: passwordHash,
        userId: data.id
      };
      Auth.create(body)
        .then(() => {
          res.status(200).send({
            message: 'Berhasil Mendaftar, Tunggu Admin mengaktifkan Akun Anda'
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: error.message
          });
        });
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      });
    });
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  Auth.findOne({ where: { username } })
    .then((data) => {
      if (data && Password.comparePassword(password, data.password)) {
        const accessToken = authService.setAccessToken({
          sessionData: data,
          maxAge: TIME_AGE_ACCESS_TOKEN
        });
        const refreshToken = authService.setRefreshToken({
          sessionData: data,
          maxAge: TIME_AGE_REFRESH_TOKEN
        });
        res.status(200).json({
          accessToken,
          refreshToken
        });
      } else {
        res.status(400).json({
          message: DATA_NOT_FOUND
        });
      }
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      });
    });
};
