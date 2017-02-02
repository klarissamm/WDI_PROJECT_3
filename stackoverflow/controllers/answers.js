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

    // find answer in question model
    // Could do this in a pre-save hook
    Question.findById(req.body.answer.question, (err, question) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!question) return res.status(404).json({ message: 'Question not found.' });

      // Push answer into question's answer array
      question.answers.push(answer.id);

      // save question here
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

// To update an answer we need the answer, the question and we need to do something with the chosen answer.
// 1. Find quuestion by ID and populate all answers
// 2. Use update function (using answer model)
// 3. Make all answers chosen(refer to answer model)false
// 4. Selection of correct answer in second part of the function
// 5. change chosen (by user 1) answer to true
function answersUpdate(req, res){
  Question
    .findById(req.params.question_id)
    .populate('answers')
    .exec((err, question) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' + err });
      if (!question) return res.status(404).json({ message: 'Question not found.' });

      Answer
        .update({question: req.params.question_id}, {chosen: false}, {multi: true},
          err => {
            if (err) return res.status(500).json({ message: 'Something went wrong.' + err });
          });

      Answer
        .findById(req.params.id, (err, answer) => {
          if (!answer) return res.status(304).json({ error: 'You already have this answer as favourite' });

          question.status = 'answered';
          answer.chosen = !answer.chosen;

          Question
            .findByIdAndUpdate(req.params.question_id, question, {new: true}, (err, newquestion) => {
              if (err) return res.status(500).json({ message: 'Something went wrong.' });
              if (!newquestion) return res.status(404).json({ message: 'Question not found.' });

              Answer
                .findByIdAndUpdate(req.params.id, answer, {new: true}, (err, newanswer) => {
                  if (err) return res.status(500).json({ message: 'Something went wrong.' });
                  if (!newanswer) return res.status(404).json({ message: 'Answer not found.' });

                  return res.status(201).json({newanswer, newquestion});
                });
            });
        });
    });
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
