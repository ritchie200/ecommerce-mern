"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _express = _interopRequireDefault(require("express"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import multerS3 from 'multer-s3';
// import aws from 'aws-sdk';
// import config from '../config';
const uploadRouter = _express.default.Router();

const storage = _multer.default.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },

  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  }

});

const upload = (0, _multer.default)({
  storage
});
uploadRouter.post('/', _utils.isAuth, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
}); // aws.config.update({
//   accessKeyId: config.accessKeyId,
//   secretAccessKey: config.secretAccessKey,
// });
// const s3 = new aws.S3();
// const storageS3 = multerS3({
//   s3,
//   bucket: 'amazona-bucket',
//   acl: 'public-read',
//   contentType: multerS3.AUTO_CONTENT_TYPE,
//   key(req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const uploadS3 = multer({ storage: storageS3 });
// router.post('/s3', uploadS3.single('image'), (req, res) => {
//   res.send(req.file.location);
// });

var _default = uploadRouter;
exports.default = _default;