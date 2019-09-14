const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  apellidoPaterno: {
    type: String,
    required: true
  },
  apellidoMaterno: {
    type: String,
    required: true
  },
  RFC: {
    type: String,
    required: true
  }
});

module.exports = Client = mongoose.model('client', ClientSchema);
