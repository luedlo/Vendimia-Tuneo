const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  date: {
    type: String
  }
});

module.exports = Sales = mongoose.model('sale', SalesSchema);
