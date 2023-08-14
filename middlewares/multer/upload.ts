import { Request } from 'express';
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination(req: Request, file: any, cb) {
    let folder: string = '';
    switch (file.fieldName) {
      case 'profileImage':
        folder = './uploads/profileImages/';
        break;
      default:
        folder = './uploads/unknown/';
        break;
    }
    if (folder) {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, {
          recursive: true
        });
      }
      cb(null, folder);
    } else {
      cb(null, '');
    }
  },
  filename(req: Request, file: any, cb: any) {
    if (req) {
      let fileName = '';
      const modifiedFileName = `${new Date().getTime()}-${file.originalname.replace(
        /\s/g,
        ''
      )}`;
      switch (file.fieldName) {
        case 'profileImage':
          fileName = `Profile-${modifiedFileName}`;
          break;
        default:
          fileName = `Unknown-${modifiedFileName}`;
          break;
      }

      cb(null, fileName);
    } else {
      cb(null, '');
    }
  }
});

function checkFileType(file: any, cb: any) {
  const filetypes = /jpeg|jpg|png/;
  const extArray = file.mimetype.split('/');
  const extension = extArray[extArray.length - 1];
  const extname = filetypes.test(extension);
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  }
});
