'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  quantity: Number,
  active: Boolean
});

export default mongoose.model('Product', ProductSchema);
