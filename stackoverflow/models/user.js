const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: {type: String, trim: true, required: true },
  github: { type: String, trim: true },
  image: { type: String, trim: true },
  bio: { type: String, trim: true },
  languages: [{ type: mongoose.Schema.ObjectId, ref: 'Language' }],
  charity: {type: String, trim: true},
  questions: [{ type: mongoose.Schema.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('User', userSchema);
