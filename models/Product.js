const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
});

module.exports = Product = mongoose.model('product', ProductSchema);
