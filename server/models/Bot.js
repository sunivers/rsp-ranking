const mongoose = require('mongoose');

const botSchema = mongoose.Schema({
  date: {
    type: String,
  },
  hour: {
    type: Number,
    min: 0,
    max: 23,
  },
  rsp: {
    type: Number,
    min: 0,
    max: 2,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Bot = mongoose.model('Bot', botSchema);

module.exports = { Bot };
