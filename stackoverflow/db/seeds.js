const mongoose  = require('mongoose');
const User      = require('../models/user');
const Answer    = require('../models/answer');
const Language  = require('../models/language');
const Question  = require('../models/question');
const config    = require('../config/config');
const Promise   = require('bluebird');
const async     = Promise.promisifyAll(require('async'));


//connection to the DB
mongoose.Promise = global.Promise;
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
    return createQuestion(options);
  })
  .then(questions => {
    console.log(`${questions.length} were created`);
    return done();
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
    return createAnswer(options);
  })
  .then(answers => {
    console.log(`${answers.length} were created`);
    return done();
  })
  .catch(done);
}

function createQuestion(options) {
  return new Promise((resolve, reject) => {
    async.waterfall([
      function chooseAskingUser(done) {
        User
          .findOne({
            email: options.askingEmail
          }, (err, user) => {
            if (err) return done(err);
            return done(null, user);
          });
      },
      function chooseLanguage(user, done) {
        Language.findOne({ name: options.language }, (err, language) => {
          if (err) return done(err);
          return done(null, user, language);
        });
      },
      function createQuestion(user, language, done) {
        options.question.owner    = user._id;
        options.question.language = language._id;
        Question
          .create(options.question, (err, question) => {
            if (err) return done(err);
            console.log(`${question.title} was created`);
            return done(null, question);
          });
      }
    ], function end(err, question) {
      if (err) {
        console.log('Error creating a question', err);
        return reject(err);
      }
      console.log(`Success, ${question.title} was created`);
      return resolve(question);
    });
  });
}

function createAnswer(options) {
  return new Promise((resolve, reject) => {
    async.waterfall([
      function chooseQuestion(done) {
        Question.findOne({
          title: options.questionTitle
        }, (err, question) => {
          if (err) return done(err);
          return done(null, question);
        });
      },
      function chooseAnsweringUser(question, done) {
        User
          .findOne({
            email: options.answeringEmail
          }, (err, user) => {
            if (err) return done(err);
            return done(null, user, question);
          });
      },
      function createAnswer(user, question, done) {
        options.answer.owner    = user._id;
        options.answer.question = question._id;
        Answer.create(options.answer, (err, answer) => {
          if (err) return done(err);
          console.log(`${answer.description} was created`);
          return done(null, answer);
        });
      }
    ], function end(err, answer) {
      if (err) {
        console.log('Error creating answer', err);
        return reject(err);
      }
      console.log(`Success, an answer was created!`);
      return resolve(answer);
    });
  });
}
