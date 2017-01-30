module.exports = {
  create: answersCreate,
  updateRight: answersUpdateRight,
  delete: answersDelete
};

const Answer   = require('../models/answer');
const Question = require('../models/question');

function answersCreate(req, res){
  if(req.decoded){
    const answer = new Answer(req.body.answer);

    answer.owner = req.decoded.id;
    answer.save((err, answer) => {
      if (err) return res.status(500).json(err);

      Question.findById(req.params.id, (err, question) => {
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        if (!question) return res.status(404).json({ message: 'Question not found.' });

        question.answers.push(answer.id);

        question.save(err  => {
          if (err) return res.status(500).json(err);
          return res.status(201).json(answer);
        });
      });
    });
  }
}

function answersUpdateRight(req, res){
  if(req.decoded){
    Question
      .find({answers: {$in: req.params.id}}, (err, question) => {
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        if (!question) return res.status(404).json({ message: 'Question not found.' });

        Answer
          .findById(req.params.id, (err, answer) => {
            if (!answer) return res.status(304).json({ error: 'You already have this answer as favourite' });

            if(question.status === 'PENDING'){
              answer.betterAnswer = true;
            }else if(question.status === 'ANSWERED' && answer.betterAnswer){
              answer.betterAnswer = false;
            }

            question.status = (answer.betterAnswer) ? 'ANSWERED' : 'PENDING';

            question.save(err  => {
              if (err) return res.status(500).json(err);
              answer.save(err  => {
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

function answersDelete(req, res){
  if(req.role === 'ADMIN'){
    Answer.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      return res.status(200).json({success: true});
    });
  }
}
