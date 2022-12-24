const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 1000000000) + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb({ message: 'Unsupported File Format' }, false);
  }
};
const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: fileFilter,
});
module.exports = uploadMiddleware;
