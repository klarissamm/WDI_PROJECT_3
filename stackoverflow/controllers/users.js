module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};

const mongoose = require('mongoose');
const User = require('../model/user');

function UsersIndex(req, res){
  User
    .find({}, (err, users) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!users) return res.status(404).json({ message: 'User not found.' });

      return res.status(200).json(users);
    });
}

function UsersShow(req, res){
    User
    .findById({ _id: req.params.id }, (err, user) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!user) return res.status(404).json({ message: 'User not found.' });
      user.populate('languages questions', (err) => {
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        return res.status(200).json(user);
      });
    });
}

function UsersUpdate(req, res){
  const userId = (req.role === 'ADMIN') ? req.params.id : req.decoded.id;
    User
    .findByIdAndUpdate(userId, req.body.user, {new: true}, (err, user) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!user) return res.status(404).json({ user: 'Language not found.' });
      return res.status(200).json(user);
    });
}

function userDelete(req, res){
  if(req.role === 'ADMIN'){
    User.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      return res.status(200).json({success: true});
    });
  }
}
