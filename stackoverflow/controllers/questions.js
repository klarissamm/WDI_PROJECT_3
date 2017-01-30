module.exports = {
  show: questionsShow,
  create: questionsCreate,
  delete: questionsDelete
};

const Question = require('../models/question');
const User     = require('../models/user');

function questionsShow(req, res){
  Question
  .findById(req.params.id, (err, question) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!question) return res.status(404).json({ message: 'Question not found.' });

    question.populate('answers language owner', (err) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });

      Question.populate(question.answers, 'owner', (err, answersPopulate)=> {
        if (err) return res.status(500).json({message: 'Something went wrong.'});
        question.answers = answersPopulate;
        return res.status(200).json(question);
      });
    });
  });
}

function questionsCreate(req, res) {
  if(req.decoded){ // if exist token means there is a user logged in, any role
    const question = new Question(req.body.question);

    question.owner = req.decoded.id; // save the token id into the question.owner
    question.save((err, question) => {
      if (err) return res.status(500).json(err);

      User.findById(req.decoded.id, (err, user) => {
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        user.questions.push(question.id); // save the question.id cause we have it as ref id
        user.save(err  => {
          if (err) return res.status(500).json(err);
          return res.status(201).json({ success: true, question});
        });
      });
    });
  }
}

function questionsDelete(req, res){
  if(req.role === 'ADMIN'){
    Question.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      return res.status(200).json({success: true});
    });
  }
}
