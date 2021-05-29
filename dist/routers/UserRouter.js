"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _ProductData = require("../data/ProductData.js");

var _UserModel = _interopRequireDefault(require("../models/UserModel.js"));

var _utils = require("../utils.js");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRouter = _express.default.Router();

userRouter.get('/seed', (0, _expressAsyncHandler.default)(async (req, res) => {
  // await User.remove({});
  const createdUsers = await _UserModel.default.insertMany(_ProductData.productList.users);
  res.send({
    createdUsers
  });
}));
userRouter.post('/signin', (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _UserModel.default.findOne({
    email: req.body.email
  });

  if (user) {
    if (_bcryptjs.default.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: (0, _utils.generateToken)(user)
      });
      return;
    }
  }

  res.status(401).send({
    message: 'Invalid email or password'
  });
}));
userRouter.post('/register', (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = new _UserModel.default({
    name: req.body.name,
    email: req.body.email,
    password: _bcryptjs.default.hashSync(req.body.password, 8)
  });
  const createdUser = await user.save();
  res.send({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: (0, _utils.generateToken)(createdUser)
  });
}));
userRouter.get('/:id', (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _UserModel.default.findById(req.params.id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({
      message: 'User Not Found'
    });
  }
}));
userRouter.put('/profile', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _UserModel.default.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = _bcryptjs.default.hashSync(req.body.password, 8);
    }

    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: (0, _utils.generateToken)(updatedUser)
    });
  }
}));
var _default = userRouter;
exports.default = _default;