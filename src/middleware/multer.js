const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images');
  },
  filename: (req, file, callback) => {
    const timeStamp = new Date().getTime();
    const originalname = file.originalname;
    // const extension = path.extname(file.originalname);

    callback(null, `${timeStamp}-${originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1000 * 1000,
  },
});

module.exports = upload;
