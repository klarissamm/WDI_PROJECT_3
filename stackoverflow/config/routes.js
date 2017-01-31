const router          = require('express').Router();
const questions       = require('../controllers/questions');
const users           = require('../controllers/users');
const answers         = require('../controllers/answers');
const languages       = require('../controllers/languages');
const authentications = require('../controllers/authentications');

/*
 * UNPROTECTED ROUTES (Do not require a JWT token)
 */

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);
router.route('/languages')
  .get(languages.index);
// The language page will show all of the questions
// e.g. /languages/1212312312313
// You might want to change this to use a name rather than an id
// e.g. /languages/ruby
router.route('/languages/:id')
  .get(languages.show);
router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show);

/*
 * PROTECTED ROUTES (Does require a JWT token)
 *
 * authentications.assignUser is a function that will take the
 * JWT provided in the request and assign to `req.user`
 * the information about that user
 */

router.route('/questions')
  .post(authentications.assignUser, questions.create);
router.route('/questions/:id')
  .get(authentications.assignUser, questions.show)
  .delete(authentications.assignUser, questions.delete);
router.route('/questions/:id/answers')
  .post(authentications.assignUser, answers.create);
router.route('/questions/:question_id/answers/:id')
  .put(authentications.assignUser, answers.update)
  .delete(authentications.assignUser, answers.delete);
router.route('/languages')
  .post(authentications.assignUser, languages.create);
router.route('/languages/:id')
  .put(authentications.assignUser, languages.update)
  .delete(authentications.assignUser, languages.delete);
router.route('/users/:id')
  .put(authentications.assignUser, users.update)
  .delete(authentications.assignUser, users.delete);


module.exports = router;
