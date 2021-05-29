"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _ProductData = require("../data/ProductData.js");

var _ProductModel = _interopRequireDefault(require("../models/ProductModel.js"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productRouter = _express.default.Router();

productRouter.get("/", async (req, res) => {
  const category = req.query.category ? {
    category: req.query.category
  } : {};
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};
  const sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? {
    price: 1
  } : {
    price: -1
  } : {
    _id: -1
  };
  const products = await _ProductModel.default.find({ ...category,
    ...searchKeyword
  }).sort(sortOrder);
  res.send(products);
});
productRouter.get('/seed', (0, _expressAsyncHandler.default)(async (req, res) => {
  const createdProducts = await _ProductModel.default.insertMany(_ProductData.productList.products);
  res.send({
    createdProducts
  });
}));
productRouter.get('/:id', (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _ProductModel.default.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: 'Product Not Found'
    });
  }
}));
productRouter.post('/', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = new _ProductModel.default({
    name: 'sample name ' + Date.now(),
    image: '/images/p1.jpg',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    description: 'sample description'
  });
  const createdProduct = await product.save();
  res.send({
    message: 'Product Created',
    product: createdProduct
  });
}));
productRouter.put('/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const productId = req.params.id;
  const product = await _ProductModel.default.findById(productId);

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    res.send({
      message: 'Product Updated',
      product: updatedProduct
    });
  } else {
    res.status(404).send({
      message: 'Product Not Found'
    });
  }
}));
productRouter.delete("/:id", _utils.isAuth, _utils.isAdmin, async (req, res) => {
  const deletedProduct = await _ProductModel.default.findById(req.params.id);

  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({
      message: "Product Deleted"
    });
  } else {
    res.send("Error in Deletion.");
  }
});
productRouter.post('/:id/reviews', _utils.isAuth, async (req, res) => {
  const product = await _ProductModel.default.findById(req.params.id);

  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully.'
    });
  } else {
    res.status(404).send({
      message: 'Product Not Found'
    });
  }
});
var _default = productRouter;
exports.default = _default;