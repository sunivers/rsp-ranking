const mongoose = require('mongoose');

const botSchema = mongoose.Schema({
  date: {
    type: String,
    maxlength: 10,
  },
  hour: {
    type: Number,
    min: 0,
    max: 23,
  },
  rsp: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Bot = mongoose.model('Bot', botSchema);

module.exports = { Bot };
