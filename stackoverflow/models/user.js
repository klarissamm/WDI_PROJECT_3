const mongoose        = require('mongoose');
const validator       = require('validator');
const bcrypt          = require('bcrypt');

const userSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: {type: String, trim: true, required: true },
  github: { type: String, trim: true },
  image: { type: String, trim: true },
  bio: { type: String, trim: true },
  languages: [{ type: mongoose.Schema.ObjectId, ref: 'Language' }],
  charity: {type: String, trim: true},
  questions: [{ type: mongoose.Schema.ObjectId, ref: 'Question' }],
  role: {type: String, required: true, trim: true, enum: ['ADMIN', 'USER'], default: 'USER'},
  passwordHash: {type: String, required: true}
});

userSchema
  .virtual('password')
  .set(setPassword);

userSchema
  .virtual('passwordConfirmation')
  .set(validatePasswordConfirmation);

userSchema
  .path('passwordHash')
  .validate(validatePasswordHash);

userSchema
  .path('email')
  .validate(validateEmail);

function setPassword(password){
  this._password = password;
  this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8)); //by default genSaltSync(10)
}

function validatePasswordConfirmation(passwordConfirmation){
  this._passwordConfirmation = passwordConfirmation;
}

function validatePasswordHash(){
  if(this.isNew){
    if(!this._password){
      return this.invalidate('password', 'A password is required');
    }

    if(this._password.length <= 5){
      return this.invalidate('password', 'The password must have more than 5 characters');
    }

    if(this._password !== this._passwordConfirmation){
      return this.invalidate('password', 'The password confirmation does not match');
    }
  }
}

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

function validateEmail(email){
  if(!validator.isEmail(email)){
    return this.invalidate('Email', 'The email is not valid');
  }
}

module.exports = mongoose.model('User', userSchema);
