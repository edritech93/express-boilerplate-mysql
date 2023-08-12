import { Request, Response } from 'express';
import { UserType } from '../types/UserType';
import db from '../models';

const User = db.user;

export const getUser = (req: Request, res: Response) => {
  const { userId } = req.user.dataValues;
  User.findOne({ where: { id: userId } })
    .then((data: UserType) => {
      if (data?.isActive) {
        res.status(200).send(data);
      } else {
        res.status(400).json({
          message: 'Akun Anda belum aktif, minta Admin untuk mengaktifkan'
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message
      });
    });
};

export const editUser = (req: Request, res: Response) => {
  const { userId } = req.user.dataValues;
  User.update(req.body, {
    where: { id: userId }
  })
    .then(() => {
      res.status(200).send({ message: 'Profil Berhasil Diubah' });
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message
      });
    });
};
