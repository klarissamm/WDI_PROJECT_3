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
        image: 'http://thumbnails109.imagebam.com/39439/e3307f394387297.jpg',
        about: 'I have been a junior developer for 1 year, working tirelessly to improve female healthcare from within the government',
        charity: '300',
        language: 'JavaScript'
      },
      {
        name: 'Emily',
        email: 'emily@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        github: 'emily_coder',
        image: 'http://www.tealeshapcott.com/teale/wp-content/uploads/2009/07/teale-shapcott-profile.jpg',
        about: 'I am 25 years old, and recently took up web development as a hobbie in my spare time. I particualrly like to experiment with front-end frameworks.',
        charity: '190345',
        language: 'PHP'
      },
      {
        name: 'Huddy',
        email: 'huddy@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        github: 'huddy_chenobi',
        image: 'http://staffordmotorspeedway.com/wp-content/uploads/RICARDED-PROFILE.jpg',
        about: 'I am the best developer ever to have lived and love kicking it back with some code and some chicas.',
        charity: '185383',
        language: 'Grunt'
      },
      {
        name: 'Aleksander',
        email: 'aleks@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        github: 'Aleksander_boom',
        image: 'https://versetracker.com/sites/default/files/styles/rapper_profile/public/rapper-pictures/t/tantrum.jpg?itok=-J8QUXxF',
        about: 'I am a Polish American rapper who codes for fun at the weekends. My favourtie coding creations are Whack-A-Trump and the stolen art map game.',
        charity: '2261',
        language: 'Python, Ruby, Go'
      },
      {
        name: 'Jamelia',
        email: 'jamelia@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        github: 'jamelia_of_stokenewington',
        image: 'http://mariterada.com/wp-content/uploads/2013/01/profile.jpg',
        about: 'I live in Stoke Newington and work as a junior developer for an agency that supports charity organisations. On Wednesdays I wear pink. I really like experimenting with front-end javaScript frameworks.',
        charity: '21369',
        language: 'Angular, React'
      },
      {
        name: 'Ismae',
        email: 'ismae@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        github: 'ismae_code_queen',
        image: 'http://www.elle.pl/gfx/00/05/80/bd/srcImage-0j93hfx_jpg/thumb_900x800_10.jpg/__/mloda-polska-moda-oczami-top-modelek-marta-dyks-starosz-fot-imaxtree.jpg',
        about: 'I am a Spanish web developer living in London. I like energy drinks like Red Bull and coding at the weekends, especially on Sunday nights.',
        charity: '21369',
        language: 'Javascript, NodeJs'
      },
      {
        name: 'Klarence',
        email: 'klarence@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        github: 'Klarence_is_cool',
        image: 'http://www.hazlewoods.co.uk/uploads/DirectorImages/Nigel_Utting_Hazlewoods_Director_Profile.jpg',
        about: 'I am from Germany and likes sausages, beef burgers and onions. I have been known to code well into the early hours along with sinking pints and watching football',
        charity: '188406',
        language: 'Ruby, Mongodb'
      },
      {
        name: 'Peter',
        email: 'peter@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        github: 'Peter_web',
        image: 'http://www.dzieyk.net/images/SAD4aL.jpg',
        about: 'I own a restaurant and learnt to code in order to build the website. Sometimes I get a bit stuck on problems, especially the more complicated problem-solving aspects.',
        charity: '248417',
        language: 'C, HTML5'
      },
      {
        name: 'Betty',
        email: 'betty@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        github: 'Betty_boo',
        image: 'http://www.trainingforvas.com/wp-content/uploads/2012/07/IMG_2258-1-200x300.jpg',
        about: 'I work as a software engineer at MunchiesInc and enjoy all things code. I enjoy teaching others and helping people with their problems. At the weekend, I surf and build rafts in Cornwall.',
        charity: '249590',
        language: 'Ruby, Mongodb'
      },
      {
        name: 'Laura',
        email: 'laura@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        github: 'laura_web_world',
        image: 'http://wac.450f.edgecastcdn.net/80450F/mychannel957.com/files/2010/12/106475045-200x300.jpg',
        about: 'I work for Monzo helping people make and stick to daily budgets. I am looking for a new job at the moment, and really want to move to San Fransisco so please get in touch if you are looking for a junior developer.',
        charity: '184854',
        language: 'Python'
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
        coins: '10'
      }
    },
    {
      askingEmail: 'klarence@gmail.com',
      language: 'JavaScript',
      question: {
        title: 'What is typeof typeof?',
        description: 'Why does this throw an error?',
        coins: '5'
      }
    },
    {
      askingEmail: 'peter@gmail.com',
      language: 'JavaScript',
      question: {
        title: 'Why does mouseover sometimes fire instead of touchstart?',
        description: 'A handler needs to react to a touchstart or mouseover event, depending on the type of input device. Note that I want to support hybrid devices (with both mouse and touchscreen) and I cannot rely on pointer events. Now, I just setup both touchstart and mouseoverevents. And for the most part it works just fine. Also use preventDefault to prohibit simulated mouse events firing after touch events. But what is totally confusing to me is that sometimes there is a still a mouseover event occuring, and if I remove the preventDefault, it even seems that the mouseoveris firing instead of a touchstart. Why oh why is this happening?',
        coins: '10'
      }
    },
    {
      askingEmail: 'aleks@gmail.com',
      language: 'JavaScript',
      question: {
        title: 'How can I make an ajax call to the active directory and pull thumbnail photos using post?',
        description: 'I want to retrieve informations from the active directory (such as thumbnail photos) using post.',
        coins: '20'
      }
    },
    {
      askingEmail: 'gigi@gmail.com',
      language: 'JavaScript',
      question: {
        title: 'Sequelize is not returning instance of model',
        description: 'I want the query to return an instance of Agent when that query is run (invoked from a POST to my api). I am using MS SQL Server 2008 R2.',
        coins: '8'
      }
    },
    {
      askingEmail: 'huddy@gmail.com',
      language: 'JavaScript',
      question: {
        title: 'How do you use callbacks properly?',
        description: 'I would like to know how to properly use callbacks and also what is the difference between a callback and a function?',
        coins: '15'
      }
    },
    {
      askingEmail: 'betty@gmail.com',
      language: 'Ruby',
      question: {
        title: 'Is Ruby compatible with strict Page Object Pattern?',
        description: 'With Ruby, the object type is not fixed at any point and is often ambiguous to the IDE. Therefore, I cannot see how you can realise these benefits on an automation suite built using Ruby (e.g. by using Cucumber). Can anyone show me how you would use Ruby with the Page Object Pattern to gain these benefits?',
        coins: '10'
      }
    },
    {
      askingEmail: 'klarence@gmail.com',
      language: 'Ruby',
      question: {
        title: 'How do I extract Tables from PDF files in Ruby?',
        description: 'What is the best way for extracting Tables which are embedded in PDF documents?',
        coins: '5'
      }
    },
    {
      askingEmail: 'emily@gmail.com',
      language: 'Ruby',
      question: {
        title: 'How to catch an error from a thread and then re-throw that error?',
        description: 'How do I catch an error from a thread and then re-throw that error when all the threads have completed?',
        coins: '10'
      }
    },
    {
      askingEmail: 'aleks@gmail.com',
      language: 'Ruby',
      question: {
        title: 'What does map(&:name) mean in Ruby?',
        description: 'What does the (&:name) in map(&:name) mean?',
        coins: '5'
      }
    },
    {
      askingEmail: 'gigi@gmail.com',
      language: 'Ruby',
      question: {
        title: 'Calling shell commands from Ruby',
        description: 'How do I call shell commands from inside of a Ruby program? How do I then get output from these commands back into Ruby?',
        coins: '12'
      }
    },
    {
      askingEmail: 'laura@gmail.com',
      language: 'Ruby',
      question: {
        title: 'Array slicing in Ruby is proving tricky - can someone help?',
        description: 'I really just do not understand it at all',
        coins: '30'
      }
    },
    {
      askingEmail: 'peter@gmail.com',
      language: 'Python',
      question: {
        title: 'Can someone explain Python\'s slice notation?',
        description: 'I need a good explanation (references are a plus) on Python\'s slice notation. To me, this notation needs a bit of picking up. It looks extremely powerful, but I haven\'t quite got my head around it.',
        coins: '12'
      }
    },
    {
      askingEmail: 'klarence@gmail.com',
      language: 'Python',
      question: {
        title: 'How do I test one variable against multiple values?',
        description: 'I\'m trying to make a function that will compare multiple variables to an integer and output a string of three letters. I was wondering if there was a way to translate this into Python.',
        coins: '4'
      }
    },
    {
      askingEmail: 'gigi@gmail.com',
      language: 'Python',
      question: {
        title: 'How do you split a list into evenly sized chunks?',
        description: 'I have a list of arbitrary length, and I need to split it up into equal size chunks and operate on it. There are some obvious ways to do this, like keeping a counter and two lists, and when the second list fills up, add it to the first list and empty the second list for the next round of data, but this is potentially extremely expensive.',
        coins: '30'
      }
    },
    {
      askingEmail: 'aleks@gmail.com',
      language: 'Python',
      question: {
        title: 'What does the “yield” keyword do?',
        description: 'What happens when the method _get_child_candidates is called? Is a list returned? A single element? Is it called again? When will subsequent calls stop?',
        coins: '50'
      }
    },
    {
      askingEmail: 'gigi@gmail.com',
      language: 'Python',
      question: {
        title: 'How to call an external command in Python',
        description: 'How can I call an external command (as if I\'d typed it at the Unix shell or Windows command prompt) from within a Python script?',
        coins: '6'
      }
    },
    {
      askingEmail: 'klarence@gmail.com',
      language: 'Python',
      question: {
        title: 'What is a metaclass in Python?',
        description: 'What do they do?',
        coins: '30'
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
      answeringEmail: 'huddy@gmail.com',
      answer: {
        description: 'You should remove the click handler once you have populated the div with the checkboxes',
        chosen: true
      }
    },
    {
      questionTitle: 'How can I disable .onclick for element\'s children?',
      answeringEmail: 'emily@gmail.com',
      answer: {
        description: 'If you go to the relevant field you can move things around and make them work and it will look good.'
      }
    },
    {
      questionTitle: 'How can I disable .onclick for element\'s children?',
      answeringEmail: 'aleks@gmail.com',
      answer: {
        description: 'There are so many ways of doing that I will message you and let you know exactly how to do it.'
      }
    },
    {
      questionTitle: 'How can I disable .onclick for element\'s children?',
      answeringEmail: 'klarence@gmail.com',
      answer: {
        description: 'I don\t really know, can someone explain that to me too?'
      }
    },
    {
      questionTitle: 'Is Ruby compatible with strict Page Object Pattern?',
      answeringEmail: 'gigi@gmail.com',
      answer: {
        description: 'As long as somewhere on the step definition class you explicitly create a new page object (in the above example: LaunchPage.new), then all subsequent pages will appear and provide intellisense method/property values.'
      }
    },
    {
      questionTitle: 'Is Ruby compatible with strict Page Object Pattern?',
      answeringEmail: 'klarence@gmail.com',
      answer: {
        description: 'I use Spinach instead of Cucumber - it\'s almost identical, but the steps are enclosed within a class that is unique to that feature file - so there\'s no leakage of objects outside of the current scope.'
      }
    },
    {
      questionTitle: 'Is Ruby compatible with strict Page Object Pattern?',
      answeringEmail: 'ismae@gmail.com',
      answer: {
        description: 'This is the approach that I use in ruby. I think that it\'s the clearest way to work. Also this enables you to store variables between steps in the instance of that page. In general I avoid this, as from a maintenance POV it\'s not always clear where it was set, but in some cases it does make it a lot easier to use than using many @variables in the cucumber steps.'
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
