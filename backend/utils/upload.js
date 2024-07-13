import multer from 'multer';
import { uploadsPath } from './index.js';
import { createDir } from './index.js';

createDir(uploadsPath);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = crypto.randomUUID();
    cb(null, uniquePrefix);
  },
});

const upload = multer({ storage });

export default upload;
