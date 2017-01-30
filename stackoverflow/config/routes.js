const router          = require('express').Router();
const questions       = require('../controllers/questions');
const users           = require('../controllers/users');
const answers         = require('../controllers/answers');
const languages       = require('../controllers/languages');
const authentications = require('../controllers/authentications');

//this middleware verifies the token
router.use(authentications.verifyToken);

//#######################Authentications Routes############################

router.route('/register')
  .post(authentications.register);
router.router('/login')
  .post(authentications.login);

//#######################Languages Routes############################

router.route('/languages')
  .get(languages.index)
  .post(languages.create);
router.route('/languages/:id')
  .get(languages.show)
  .put(languages.update)
  .delete(languages.delete);

//#######################Users Routes############################

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

//#######################Questions Routes############################

router.route('/questions')
  .post(questions.create);
router.route('/questions/:id')
  .get(questions.show)
  .delete(questions.delete);

//#######################Answers Routes############################

// Needs to be more restful
router.route('/addanswer/:id') // id of the question!!!
  .post(answers.create);
router.route('/answers/:id')
  .get(answers.updateRight)
  .delete(answers.delete);

module.exports = router;
