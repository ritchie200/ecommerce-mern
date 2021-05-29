"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _UserRouter = _interopRequireDefault(require("./routers/UserRouter.js"));

var _ProductRouter = _interopRequireDefault(require("./routers/ProductRouter.js"));

var _OrderRouter = _interopRequireDefault(require("./routers/OrderRouter.js"));

var _path = _interopRequireDefault(require("path"));

var _UploadRouter = _interopRequireDefault(require("./routers/UploadRouter.js"));

var _config = _interopRequireDefault(require("./config"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
const mongodbUrl = _config.default.MONGODB_URL;

_mongoose.default.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.get("/api/config/paypal", (req, res) => {
  res.send(_config.default.PAYPAL_CLIENT_ID);
});
app.use('/api/uploads', _UploadRouter.default);
app.use('/api/users', _UserRouter.default);
app.use('/api/products', _ProductRouter.default);
app.use('/api/orders', _OrderRouter.default);

const _dirname = _path.default.resolve(); //app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/uploads', _express.default.static(_path.default.join(_dirname, 'uploads')));
app.get('/', (req, res) => {
  res.send('Server is ready');
});
app.use((err, req, res, next) => {
  res.status(500).send({
    message: err.message
  });
});
app.use(_express.default.static(_path.default.join(_dirname, '/../client/build')));
app.get('*', (req, res) => {
  res.sendFile(_path.default.join(`${_dirname}/../client/build/index.html`));
});
app.listen(_config.default.PORT, () => {
  console.log('Server started at http://localhost:4000');
});