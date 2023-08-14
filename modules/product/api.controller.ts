import { Request, Response } from 'express';
// import db from '../../models';

// const Product = db.product;
// const Op = db.Sequelize.Op;

export const getProduct = (req: Request, res: Response) => {
  // const { search } = req.query;
  // const condition = search
  //   ? { productName: { [Op.like]: `%${search}%` } }
  //   : null;
  // Product.findAll({ where: condition })
  //   .then((data) => {
  //     res.status(200).send(data);
  //   })
  //   .catch((error) => {
  //     res.status(400).json({
  //       message: error.message
  //     });
  //   });
};

export const getProductUser = (req: Request, res: Response) => {
  // const { userId } = req.user.dataValues;
  // Product.findAll({ where: { userId } })
  //   .then((data) => {
  //     res.status(200).send(data);
  //   })
  //   .catch((error) => {
  //     res.status(400).json({
  //       message: error.message
  //     });
  //   });
};

export const addProduct = (req: Request, res: Response) => {
  // const { userId } = req.user.dataValues;
  // Product.create({ ...req.body, userId })
  //   .then(() => {
  //     res.status(200).send({ message: 'Produk Berhasil Ditambahkan' });
  //   })
  //   .catch((error) => {
  //     res.status(400).send({
  //       message: error.message
  //     });
  //   });
};

export const editProduct = (req: Request, res: Response) => {
  // const { productId } = req.params;
  // Product.update(req.body, {
  //   where: { id: productId }
  // })
  //   .then(() => {
  //     res.status(200).send({ message: 'Produk Berhasil Diubah' });
  //   })
  //   .catch((error) => {
  //     res.status(400).json({
  //       message: error.message
  //     });
  //   });
};

export const deleteProduct = (req: Request, res: Response) => {
  // const { productId } = req.params;
  // Product.destroy({ where: { id: productId } })
  //   .then(() => {
  //     res.status(200).send({ message: 'Produk Berhasil Dihapus' });
  //   })
  //   .catch((error) => {
  //     res.status(400).json({
  //       message: error.message
  //     });
  //   });
};
