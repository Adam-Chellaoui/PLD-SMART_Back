import multer from 'multer';


const storage = multer.diskStorage({

    destination(req, file, callback,err) {
      console.log(file)
      callback(null, './images');
    },
    filename(req, file, callback) {
      console.log(file)
      callback(null, `${file.fieldname}_${file.originalname}`);
    },
  });


  
export const upload = multer({ storage: storage });