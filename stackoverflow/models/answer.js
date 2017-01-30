const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
  description: { type: String, trim: true, require: true },
  chosen: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Answer', answerSchema);
