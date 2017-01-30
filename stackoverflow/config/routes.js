const router = require('express').Router();
const question  = require('../controllers/questions');
const user  = require('../controllers/users');
const answer = require('../controllers/answers');
const lenguage = require('../controllers/languages');
const authentication   = require('../controllers/authentications');

//this middleware verifies the token
router.use(authentication.verifyToken);

//#######################Lenguages Routes############################

router.route('/lenguages')
  .get(lenguage.index)
  .post(lenguage.create);
router.route('/lenguages/:id')
  .get(lenguage.show)
  .put(lenguage.update)
  .delete(lenguage.delete);

//#######################Users Routes############################
router.route('/users')
  .get(user.index);
router.route('/users/:id')
  .get(user.show)
  .put(user.update)
  .delete(user.delete);

//#######################Questions Routes############################
router.route('/questions')
  .post(question.create);
router.route('/questions/:id')
  .get(question.show)
  .delete(question.delete);
//#######################Answers Routes############################
router.route('/addanswer/:id') // id of the question!!!
  .post(answer.create);
router.route('/answers/:id')
  .get(answer.updateRight)
  .delete(answer.delete);

module.exports = router;
