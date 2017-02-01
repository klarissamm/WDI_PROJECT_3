module.exports = {
  create: answersCreate,
  update: answersUpdate,
  delete: answersDelete
};

const Answer   = require('../models/answer');
const Question = require('../models/question');

/*
 * PROTECTED
 * POST /questions/:id/answers
 */
function answersCreate(req, res){
  const answer = new Answer(req.body.answer);
  answer.owner = req.user._id;

  answer.save((err, answer) => {
    if (err) return res.status(500).json(err);

    // Could do this in a pre-save hook
    Question.findById(req.body.answer.question, (err, question) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!question) return res.status(404).json({ message: 'Question not found.' });

      // Push answer into question's answer array
      question.answers.push(answer.id);

      question.save(err  => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(answer);
      });
    });
  });
}

/*
 * PROTECTED
 * PUT /questions/:question_id/answers/:id
 * LATER...
 */

function answersUpdate(req, res){
  if(req.decoded){
    Question.find({answers: {$in: req.params.id}}, (err, question) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!question) return res.status(404).json({ message: 'Question not found.' });
      Answer.findById(req.params.id, (err, answer) => {
        if (!answer) return res.status(304).json({ error: 'You already have this answer as favourite' });
        if(question.status === 'PENDING'){
          answer.betterAnswer = true;
          question.status = 'ANSWERED';
        }else if(question.status === 'ANSWERED' && answer.betterAnswer){
          answer.betterAnswer = false;
          question.status = 'PENDING';
        }
        question.save(err => {
          if (err) return res.status(500).json(err);
          answer.save(err => {
            if (err) return res.status(500).json(err);
            return res.status(201).json(answer);
          });
        });
      });
    });
  }else{
    return res.status(403).json({ error: 'Access Denied' });
  }
}




/*
 * PROTECTED
 * DELETE /questions/:question_id/answers/:id
 * LATER...
 */
function answersDelete(req, res){
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      message: 'You must be an admin to delete answers.'
    });
  }

  Answer.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({success: true});
  });
}
