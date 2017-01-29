const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  title: {type: String, trim: true, require: true},
  description: {type: String, trim: true, require: true},
  language: { type: mongoose.Schema.ObjectId, ref: 'Language' },
  answers: [{ type: mongoose.Schema.ObjectId, ref: 'Answer' }],
  status: {type: String, required: true, trim: true, enum: ['PENDING', 'ANSWERED', 'CANCELLED'], default: 'PENDING'},
  coins: {type: Number, required: true, trim: true},
  owner: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Question', questionSchema);
