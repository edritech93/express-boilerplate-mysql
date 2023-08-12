import { Request, Response } from 'express';
import mime from 'mime-types';
import multer from 'multer';
import UUID from 'uuid';
import fs from 'fs';

const mainPath = './public/attachment/';

let filePath: string = '';
let fileName: string = '';

const storage = multer.diskStorage({
  destination: function (_: Request, file, cb) {
    filePath = mainPath + 'kta';
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    cb(null, filePath);
  },
  filename: function (_: Request, file, cb) {
    const ext = mime.extension(file.mimetype);
    fileName = `${UUID.v4()}.${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

export const addAttachment = (req: Request, res: Response) => {
  const newUpload = upload.array('file', 10);
  newUpload(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      res.status(500).json({
        message: 'Internal Server error'
      });
    } else if (error) {
      res.status(400).json({
        message: error.message
      });
    } else {
      if (filePath && fileName) {
        const attachmentUrl = filePath.substring(8) + '/' + fileName;
        res.status(200).json({
          message: 'Upload berhasil',
          url: attachmentUrl
        });
      } else {
        res.status(400).json({
          message: 'file is required'
        });
      }
    }
  });
};
