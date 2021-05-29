"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _OrderModel = _interopRequireDefault(require("../models/OrderModel.js"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderRouter = _express.default.Router();

orderRouter.get('/mine', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const orders = await _OrderModel.default.find({
    user: req.user._id
  });
  res.send(orders);
}));
orderRouter.post('/', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({
      message: 'Cart is empty'
    });
  } else {
    const order = new _OrderModel.default({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id
    });
    const createdOrder = await order.save();
    res.status(201).send({
      message: 'New Order Created',
      order: createdOrder
    });
  }
}));
orderRouter.get('/:id', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _OrderModel.default.findById(req.params.id);

  if (order) {
    res.send(order);
  } else {
    res.status(404).send({
      message: 'Order Not Found'
    });
  }
}));
orderRouter.put('/:id/pay', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _OrderModel.default.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };
    const updatedOrder = await order.save();
    res.send({
      message: 'Order Paid',
      order: updatedOrder
    });
  } else {
    res.status(404).send({
      message: 'Order Not Found'
    });
  }
}));
orderRouter.delete("/:id", _utils.isAuth, _utils.isAdmin, async (req, res) => {
  const order = await _OrderModel.default.findOne({
    _id: req.params.id
  });

  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.");
  }
});
orderRouter.get("/", _utils.isAuth, async (req, res) => {
  const orders = await _OrderModel.default.find({}).populate('user');
  res.send(orders);
});
var _default = orderRouter;
exports.default = _default;