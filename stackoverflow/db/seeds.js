const mongoose  = require('mongoose');
const User      = require('../models/user');
const Answer    = require('../models/answer');
const Language  = require('../models/language');
const Question  = require('../models/question');
const config    = require('../config/config');
const async     = require('async');

//connection to the DB
mongoose.Promise = global.Promise;
mongoose.connect(config.db, (err) => {
  if(err) return console.log(`Connection error: ${err}`);
  console.log(`Connected to db: ${config.db}`);
});

async.waterfall([
  dropCollections,
  createLanguages,
  createAskingUser,
  createQuestion,
  createAnsweringUser,
  createAnswer
], function end(err) {
  if (err) {
    console.log('ERROR', err);
    return process.exit();
  }
  console.log('SUCCESS');
  return process.exit();
});

function dropCollections(done) {
  User.collection.drop();
  Answer.collection.drop();
  Question.collection.drop();
  Language.collection.drop();
  return done(null);
}

function createLanguages(done) {
  Language
    .create([
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'Ruby', icon: 'devicon-ruby-plain-wordmark colored'},
      { name: 'Python', icon: 'devicon-python-plain colored'},
      { name: 'C++', icon: 'devicon-cplusplus-plain-wordmark colored'},
      { name: 'Grunt', icon: 'devicon-grunt-plain-wordmark colored'},
      { name: 'Erlang', icon: 'devicon-erlang-plain-wordmark colored'}
    ], (err, languages) => {
      if (err) return done(err);
      console.log(`${languages.length} Languages created!`);
      return done(null, languages);
    });
}

function createAskingUser(languages, done) {
  User
    .create({
      name: 'Gigi',
      email: 'gigi@gmail.com',
      password: 'password',
      passwordConfirmation: 'password',
      github: 'gigi_loves_coding',
      image: 'http://fillmurray.com/200/300',
      about: 'I have been a web developer for 1 year working for the government',
      charity: '',
      language: 'JavaScript'
    }, (err, user) => {
      if (err) return done(err);
      console.log(`${user.name} was created`);
      return done(null, user);
    });
}

function createQuestion(user, done) {
  Language
    .findOne({ name: 'JavaScript'}, (err, language) => {
      if (err) return done(err);
      Question
        .create({
          title: 'How can I disable .onclick for element\'s children?',
          description: 'I cannot mark a checkbox option as selected or deselect it. How can I make it available?',
          status: 'answered',
          coins: '5',
          owner: user._id,
          language: language._id
        }, (err, question) => {
          if (err) return done(err);
          console.log(`${question.title} was created`);
          return done(null, question);
        });
    });
}

function createAnsweringUser(question, done) {
  User
    .create({
      name: 'Gigi2',
      email: 'gigi2@gmail.com',
      password: 'password',
      passwordConfirmation: 'password',
      github: 'gigi2_loves_coding',
      image: 'http://fillmurray.com/g/200/300',
      about: 'I have been a web developer for 1 year working for the   government',
      charity: '',
      language: 'JavaScript, Ruby, Go'
    }, (err, user) => {
      if (err) return done(err);
      console.log(`${user.name} was created`);
      return done(null, user, question);
    });
}

function createAnswer(user, question, done) {
  Answer.create({
    description: 'You should remove the click handler once you have populated the div with the checkboxes',
    chosen: true,
    owner: user._id,
    question: question._id
  }, (err, answer) => {
    if (err) return done(err);
    console.log(`${answer.description} was created`);
    return done(null);
  });
}
