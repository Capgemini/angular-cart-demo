'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  quantity: Number,
  active: Boolean
});

exports['default'] = mongoose.model('Product', ProductSchema);
module.exports = exports['default'];
//# sourceMappingURL=product.model.js.map
