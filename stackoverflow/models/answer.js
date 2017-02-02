const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
  description: { type: String, trim: true, required: true },
  chosen: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User'},
  question: { type: mongoose.Schema.ObjectId, ref: 'Question'}
});

module.exports = mongoose.model('Answer', answerSchema);
