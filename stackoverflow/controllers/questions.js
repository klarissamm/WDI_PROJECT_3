module.exports = {
  show: questionsShow,
  create: questionsCreate,
  delete: questionsDelete
};

const mongoose = require('mongoose');
const Question = require('../model/question');

function questionsShow(req, res){
  Question
  .find({}, (err, questions) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!questions) return res.status(404).json({ message: 'Questions not found.' });

    return res.status.json(questions);
  });
}

function questionsCreate(req, res) {
  const userId = (req.role === 'ADMIN') ? req.params.id : req.decoded.id;
  const question = new Question(req.body.question);
  if(userId){
    question.save((err, question) => {
      if (err) return res.status(500).json(err);

      userId.questions.push(question);

      userId.save(err  => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(question);
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
