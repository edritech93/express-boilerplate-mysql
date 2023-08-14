import express, { Express, NextFunction, Request, Response } from 'express';
import errorHandler from './middlewares/error_handler';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './models';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app: Express = express();
dotenv.config();
app.use(bodyParser.json()); // NOTE: type JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());
app.use('/attachments', express.static(path.join(__dirname, 'attachments')));
app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
  next();
});
app.use(routes);

// NOTE: force for develop is true, for production is false
db.sequelize
  .sync({ force: false })
  .then(() => {
    app.use(errorHandler);
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
  })
  .catch((error: object) => {
    console.log('Sync Database => ', error);
  });
