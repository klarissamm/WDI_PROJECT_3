module.exports = {
  show: questionsShow,
  create: questionsCreate,
  delete: questionsDelete
};

const Question = require('../models/question');
const User     = require('../models/user');

/*
 * PROTECTED
 * GET /questions/:id
 */
function questionsShow(req, res){
  Question
  .findById(req.params.id)
  .populate(['answers', 'language', 'owner'])
  .exec((err, question) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!question) return res.status(404).json({ message: 'Question not found.' });
    return res.status(200).json(question);
  });
}

/*
 * PROTECTED
 * POST /questions
 */
function questionsCreate(req, res) {
  const question = new Question(req.body);
console.log(question)
  // Assign the question to the user who made the request
  question.owner = req.user._id;
  question.save((err, question) => {
    if (err) return res.status(500).json(err);

    // Push the question into the user's array of questions
    // Could do this in a pre-save hook
    User.findById(req.user._id, (err, user) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!user) return res.status(404).json({ message: 'User not found.' });

      // Push the question.id into the user's array of questions
      user.questions.push(question.id);

      user.save(err  => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(question);
      });
    });
  });
}
// function moviesNew(req, res) {
//  Languages.find({}, (err, languages) => {
//    if (err) return res.render('movies/new', { error: err.message });
//    return res.render('movies/new', { error: null, directors });
//  });
// }
/*
 * PROTECTED
 * DELETE /questions/:id
 */
function questionsDelete(req, res){
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      message: 'You must be an admin to delete questions.'
    });
  }

  Question.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({success: true});
  });
}
