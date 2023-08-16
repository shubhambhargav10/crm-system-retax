const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  positions: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  }
});



const ClientModel = mongoose.model('Client', clientSchema);

module.exports = { ClientModel };
