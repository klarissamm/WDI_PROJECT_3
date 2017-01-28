const mongoose  = require('mongoose');             //mongoose - required to connect to mongodb
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
    'name': 'Ismael',
    'email': 'ismaelbacha@hotmail.com',
    'password': 'password',
    'passwordConfirmation': 'password',
    'github': 'ismaelocaramelo',
    'image': 'ismael.png',
    'bio': 'Hi',
    'role': 'ADMIN'
  },{
    'name': 'Ismael',
    'email': 'ismaelbacha@hotmail.com',
    'password': 'password',
    'passwordConfirmation': 'password',
    'github': 'ismaelocaramelo',
    'image': 'ismael.png',
    'bio': 'Hi',
    'role': 'ADMIN'
  }];

  User.insertMany(admins, (err) => {
    if(err) return err;
    return logger.info('Admins created');
  });
});
