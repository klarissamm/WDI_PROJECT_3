const mongoose  = require('mongoose');
const User      = require('../models/user');
const Answer    = require('../models/answer');
const Language  = require('../models/language');
const Question  = require('../models/question');
const config    = require('../config/config');
const async     = require('async');
const Promise   = require('bluebird');

//connection to the DB
mongoose.Promise = Promise;

mongoose.connect(config.db, (err) => {
  if(err) return console.log(`Connection error: ${err}`);
  console.log(`Connected to db: ${config.db}`);
});

async.waterfall([
  dropCollections,
  createLanguages,
  createUsers,
  createQuestions,
  createAnswers
], function end(err) {
  if (err) {
    console.log('Error with seeding', err);
    return process.exit();
  }
  console.log('Seeding complete!');
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
      { name: 'C++', icon: 'devicon-cplusplus-plain-wordmark colored'},
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'Ruby', icon: 'devicon-ruby-plain-wordmark colored'},
      { name: 'Python', icon: 'devicon-python-plain colored'},
      { name: 'Grunt', icon: 'devicon-grunt-plain-wordmark colored'},
      { name: 'C', icon: 'devicon-c-plain colored'},
      { name: 'AngularJS', icon: 'devicon-angularjs-plain colored'},
      { name: 'PHP', icon: 'devicon-php-plain colored'},
      { name: 'Go', icon: 'devicon-go-plain colored'},
      { name: 'React', icon: 'devicon-react-original-wordmark colored'},
      { name: 'NodeJS', icon: 'devicon-nodejs-plain-wordmark colored'},
      { name: 'HTML5', icon: 'devicon-html5-plain-wordmark colored'},
      { name: 'BackboneJS', icon: 'devicon-backbonejs-plain-wordmark colored'},
      { name: 'Rails', icon: 'devicon-rails-plain-wordmark colored'},
      { name: 'Mongodb', icon: 'devicon-mongodb-plain-wordmark colored'},
      { name: 'Java', icon: 'devicon-java-plain-wordmark colored'},
      { name: 'MySQL', icon: 'devicon-mysql-plain colored'},
      { name: 'Erlang', icon: 'devicon-erlang-plain-wordmark colored'}
    ], (err, languages) => {
      if (err) return done(err);
      console.log(`${languages.length} Languages created!`);
      return done(null);
    });
}

function createUsers(done) {
  User
    .create([
      {
        name: 'Gigi',
        email: 'gigi@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        github: 'gigi_loves_coding',
        image: 'http://fillmurray.com/200/300',
        about: 'I have been a web developer for 1 year working for the government',
        charity: '',
        language: 'JavaScript'
      },
      {
        name: 'Gigi2',
        email: 'gigi2@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        github: 'gigi2_loves_coding',
        image: 'http://fillmurray.com/g/200/300',
        about: 'I have been a web developer for 1 year working for the   government',
        charity: '',
        language: 'JavaScript, Ruby, Go'
      }
    ], (err, users) => {
      if (err) return done(err);
      console.log(`${users.length} were created`);
      return done(null);
    });
}

function createQuestions(done) {
  console.log('Creating questions');
  const questions = [
    {
      askingEmail: 'gigi@gmail.com',
      language: 'JavaScript',
      question: {
        title: 'How can I disable .onclick for element\'s children?',
        description: 'I cannot mark a checkbox option as selected or deselect it. How can I make it available?',
        status: 'answered',
        coins: '5'
      }
    },
    {
      askingEmail: 'gigi@gmail.com',
      language: 'JavaScript',
      question: {
        title: 'What is typeof typeof?',
        description: 'Why does this throw an error?',
        coins: '5'
      }
    }
  ];
  return Promise.map(questions, (options) => {
    console.log(`Making a question!`)
    return createQuestionPromise(options);
  })
  .then(() => {
    console.log('Finished creating questions!');
    return done(null);
  })
  .catch(done);
}

function createAnswers(done) {
  console.log('Creating answers');
  const answers = [
    {
      questionTitle: 'How can I disable .onclick for element\'s children?',
      answeringEmail: 'gigi2@gmail.com',
      answer: {
        description: 'You should remove the click handler once you have populated the div with the checkboxes',
        chosen: true
      }
    },
    {
      questionTitle: 'How can I disable .onclick for element\'s children?',
      answeringEmail: 'gigi2@gmail.com',
      answer: {
        description: 'I dunno?'
      }
    },
    {
      questionTitle: 'How can I disable .onclick for element\'s children?',
      answeringEmail: 'gigi2@gmail.com',
      answer: {
        description: 'Checking that this works...'
      }
    }
  ];
  return Promise.map(answers, (options) => {
    return createAnswerPromise(options);
  })
  .then(() => {
    console.log('Finished creating answers!');
    return done(null);
  })
  .catch(done);
}

const createQuestionPromise = Promise.promisifyAll(createQuestion);

function createQuestion(options) {
  console.log('Creating a question inside createQuestion');
  async.waterfall([
    function chooseAskingUser(next) {
      console.log('chooseAskingUser')
      User
        .findOne({
          email: options.askingEmail
        }, (err, user) => {
          console.log('ERROR', err);
          if (err) return next(err);
          console.log(`${user} found for chooseAskingUser`);
          return next(null, user);
        });
    },
    function chooseLanguage(user, next) {
      Language.findOne({
        name: options.language
      }, (err, language) => {
        if (err) return next(err);
        console.log(`${language.name} found for chooseLanguage`);
        return next(null, user, language);
      });
    },
    function createQuestion(user, language, next) {
      options.question.owner    = user._id;
      options.question.language = language._id;
      Question
        .create(options.question, (err, question) => {
          if (err) return next(err);
          console.log(`${question.title} was created`);
          return next(null, question);
        });
    }
  ], function end(err, question) {
    if (err) {
      console.log('Error', err);
      return process.exit();
    }
    console.log(`Success ${question.title} was created.`);
  });
}

const createAnswerPromise = Promise.promisifyAll(createAnswer);

function createAnswer(options) {
  async.waterfall([
    function chooseQuestion(next) {
      Question.findOne({
        title: options.questionTitle
      }, (err, question) => {
        if (err) return next(err);
        return next(null, question);
      });
    },
    function chooseAnsweringUser(question, next) {
      User
        .findOne({
          email: options.answeringEmail
        }, (err, user) => {
          if (err) return next(err);
          if (!user) return next('No user was found.');
          return next(null, user, question);
        });
    },
    function createAnswer(user, question, next) {
      options.answer.owner    = user._id;
      options.answer.question = question._id;
      Answer.create(options.answer, (err, answer) => {
        if (err) return next(err);
        console.log(`${answer.description} was created`);
        return next(null, answer);
      });
    }
  ], function end(err) {
    if (err) {
      console.log('Error', err);
      return process.exit();
    }
    console.log('Success. A question was answered.');
  });
}
