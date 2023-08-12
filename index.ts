import express, { Express, NextFunction, Request, Response } from 'express';
import { ErrorType } from './types/ErrorType';
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
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
  next();
});
app.use(routes);
app.use((error: ErrorType, req: Request, res: Response) => {
  const { status = 500, message, data } = error;
  res.status(status).json({ message: message, data: data });
});

// NOTE: force for develop is true, for production is false
db.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
  })
  .catch((error: any) => {
    console.log('Sync Database => ', error);
  });
