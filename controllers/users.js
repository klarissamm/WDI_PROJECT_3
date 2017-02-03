module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};

const User = require('../models/user');

/*
 * UNPROTECTED
 * GET /users
 */
function usersIndex(req, res){
  User
    .find({})
    .exec((err, users) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!users) return res.status(404).json({ message: 'User not found.' });

      return res.status(200).json(users);
    });
}

/*
 * UNPROTECTED
 * GET /users/:id
 */
function usersShow(req, res){
  User
    .findById({ _id: req.params.id })
    .populate(['questions'])
    .exec((err, user) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!user) return res.status(404).json({ message: 'User not found.' });
      return res.status(200).json(user);
    });
}

/*
 * PROTECTED
 * PUT /users/:id
 */
function usersUpdate(req, res){
  User
    .findByIdAndUpdate(req.body.id, req.body.user, {new: true}, (err, user) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!user) return res.status(404).json({ user: 'User not found.' });
      return res.status(200).json(user);
    });
}

//new: true -> the database is being updated with the new information.

/*
 * PROTECTED
 * DELETE /users/:id
 */
function usersDelete(req, res){
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({success: true});
  });
}
