const mongoose = require('mongoose');

const languageSchema = mongoose.Schema({
  name: { type: String, trim: true, require: true },
  questions: [{ type: mongoose.Schema.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Language', languageSchema);
