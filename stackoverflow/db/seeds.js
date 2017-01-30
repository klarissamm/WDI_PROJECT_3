const mongoose  = require('mongoose');
const User      = require('../model/user');
const config    = require('../config/config');

//connection to the DB
mongoose.Promise = global.Promise;
mongoose.connect(config.database(), (err) => {
  if(err) return console.log(`Connection error: ${err}`);
  console.log(`Connected to db: ${config.database()}`);

  User.collection.drop();

 // NEEDS TO FINISHED;
  const admins = [{
    'name': 'Ismael',
    'email': 'ismaelbacha@hotmail.com',
    'password': 'password',
    'passwordConfirmation': 'password',
    'github': 'ismaelocaramelo',
    'image': 'ismael.png',
    'bio': 'Hi',
    'role': 'admin'
  },{
    'name': 'Klarissa',
    'email': 'klarissamunz@gmail.com',
    'password': 'password',
    'passwordConfirmation': 'password',
    'github': 'klarissamm',
    'image': 'klarissamm.png',
    'bio': 'Hi',
    'role': 'admin'
  },{
    'name': 'Jamie',
    'email': 'jgranthamburton@gmail.com',
    'password': 'password',
    'passwordConfirmation': 'password',
    'github': 'ismaelocaramelo',
    'image': 'Jamie.png',
    'bio': 'Hi',
    'role': 'admin'
  },{
    'name': 'Hudhayfa',
    'email': 'hudhayfajamalkhan@gmail.com',
    'password': 'password',
    'passwordConfirmation': 'password',
    'github': '*******',
    'image': 'Hudhayfa.png',
    'bio': 'Hi',
    'role': 'admin'
  },{
    'name': 'Aleksandra M',
    'email': '@aleksmikolajczyk',
    'password': 'password',
    'passwordConfirmation': 'password',
    'github': '*******',
    'image': 'Aleksandra.png',
    'bio': 'Hi',
    'role': 'admin'
  }];

  User.insertMany(admins, (err) => {
    if(err) return err;
    return console.log('Admins created');
  });
});

// Create a user
// Create a language
// Create (several) questions for that language
// Create (several) answers for those questions
// Have one of them marked as the correct answer
