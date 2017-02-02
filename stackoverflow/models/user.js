const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt    = require('bcrypt');
const userTypes = ['admin', 'user'];

const userSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  passwordHash: {type: String, required: true},
  github: { type: String, trim: true },
  image: { type: String, trim: true },
  about: { type: String, trim: true },
  charity: {type: String, trim: true},
  role: {type: String, required: true, trim: true, enum: userTypes, default: 'user'},
  language: {type: String, trim: true},
  questions: [{ type: mongoose.Schema.ObjectId, ref: 'Question' }]
});

// the only way to add an admin in through seeding. Currently, admins have no functionality.


userSchema.set('toJSON', {
  transform: function(doc, ret){
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
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

userSchema.methods.validatePassword = validatePassword;

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
