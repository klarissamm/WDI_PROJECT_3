const mongoose = require('mongoose');
const questionStatuses = ['pending', 'answered', 'cancelled'];

const questionSchema = mongoose.Schema({
  title: { type: String, trim: true, require: true },
  description: { type: String, trim: true, require: true },
  status: {type: String, required: true, trim: true, enum: questionStatuses, default: 'pending'},
  // coins: {type: Number, required: true, trim: true},
  language: { type: mongoose.Schema.ObjectId, ref: 'Language' },
  answers: [{ type: mongoose.Schema.ObjectId, ref: 'Answer' }],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User'}
});


questionSchema.pre('save', function(done) {
  return this.model('Language').findByIdAndUpdate(this.language, { $addToSet: { questions: this._id }}, done);
});

// Add to the owner

module.exports = mongoose.model('Question', questionSchema);
