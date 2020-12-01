const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rsp: {
    type: Number,
    min: 0,
    max: 2,
  },
  hour: {
    type: Number,
    min: 0,
    max: 23,
  },
  point: {
    type: Number,
    default: 0,
  },
  state: {
    type: String,
    default: 'DRAW',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.model('History', historySchema);

module.exports = { History };
