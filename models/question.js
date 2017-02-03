const mongoose = require('mongoose');
const questionStatuses = ['pending', 'answered', 'cancelled'];

const questionSchema = mongoose.Schema({
  title: { type: String, trim: true, require: true },
  description: { type: String, trim: true, require: true },
  status: {type: String, required: true, trim: true, enum: questionStatuses, default: 'pending'},
  coins: {type: Number, required: true, trim: true},
  language: { type: mongoose.Schema.ObjectId, ref: 'Language' },
  answers: [{ type: mongoose.Schema.ObjectId, ref: 'Answer' }],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

// language + owner are not in an array because every question can only have 1 of each, but multiple answers.

// enum means that you can have multiple values for the key. With enum, use a default.

// before it saves the question, the below function saves the language and user and adds it into the model.

questionSchema.pre('save', function(done) {
  return this.model('Language').findByIdAndUpdate(this.language, { $addToSet: { questions: this._id }}, done);
});

questionSchema.pre('save', function(done) {
  return this.model('User').findByIdAndUpdate(this.owner, { $addToSet: { questions: this._id }}, done);
});

module.exports = mongoose.model('Question', questionSchema);
