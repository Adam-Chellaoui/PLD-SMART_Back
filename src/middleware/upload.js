import multer from 'multer';

const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './images');
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${file.originalname}`);
    },
  });
  
export const upload = multer({ storage });