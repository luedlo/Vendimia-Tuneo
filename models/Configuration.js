const mongoose = require('mongoose');

const ConfigurationSchema = new mongoose.Schema({
  financeRate: {
    type: Number,
    required: true
  },
  deposit: {
    type: Number,
    required: true
  },
  timeLimit: {
    type: Number,
    required: true
  }
});

module.exports = Configuration = mongoose.model(
  'configuration',
  ConfigurationSchema
);
