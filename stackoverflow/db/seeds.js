const mongoose  = require('mongoose');      //mongoose - required to connect to mongodb
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
    'role': 'ADMIN'
  },{
    'name': 'Klarissa',
    'email': 'klarissamunz@gmail.com',
    'password': 'password',
    'passwordConfirmation': 'password',
    'github': 'klarissamm',
    'image': 'klarissamm.png',
    'bio': 'Hi',
    'role': 'ADMIN'
  },{
    'name': 'Jamie',
    'email': 'jgranthamburton@gmail.com',
    'password': 'password',
    'passwordConfirmation': 'password',
    'github': 'ismaelocaramelo',
    'image': 'Jamie.png',
    'bio': 'Hi',
    'role': 'ADMIN'
  },{
    'name': 'Hudhayfa',
    'email': 'hudhayfajamalkhan@gmail.com',
    'password': 'password',
    'passwordConfirmation': 'password',
    'github': '*******',
    'image': 'Hudhayfa.png',
    'bio': 'Hi',
    'role': 'ADMIN'
  },{
    'name': 'Aleksandra M',
    'email': '@aleksmikolajczyk',
    'password': 'password',
    'passwordConfirmation': 'password',
    'github': '*******',
    'image': 'Aleksandra.png',
    'bio': 'Hi',
    'role': 'ADMIN'
  }];

  User.insertMany(admins, (err) => {
    if(err) return err;
    return console.log('Admins created');
  });
});
