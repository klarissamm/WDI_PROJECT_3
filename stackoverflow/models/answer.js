const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
  description: { type: String, trim: true, required: true },
  chosen: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User'},
  question: { type: mongoose.Schema.ObjectId, ref: 'Question'}
});

// answerSchema.pre('save', function(done) {
//   return this.model('Question').findByIdAndUpdate(this.question, { $addToSet: { answers: this._id }}, done);
// });

module.exports = mongoose.model('Answer', answerSchema);
