module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin,
  assignUser: assignUser
};

const jwt    = require('jsonwebtoken');
const User   = require('../models/user');
const config = require('../config/config');

/*
 * POST /register
 * When a user registers, the default 'role' is 'user'.
 * This has already been set in the model.
 */

function authenticationsRegister(req, res){
  User.create(req.body, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });

    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 60*60*24 });

    return res.status(201).json({
      message: `Welcome ${user.username}!`,
      user,
      token
    });
  });
}

/*
 *  * POST /login
 */
function authenticationsLogin(req, res){
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).json({success: false, message: `${err}` });
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(403).json({success: false, message: `Unauthorized. ${err}`});
    }

    const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 60 * 60} );
    return res.status(200).json({success: true, message: 'Welcome back.', user, token});
  });
}

function assignUser(req, res, next){
  // Get the JWT token from the Authorization Header
  // 'Bearer asdjnaksdnkajsndas.kansdnansdakjsndasd.ansdoiansdoinasdasd'
  const token = req.headers['authorization'].split(' ')[1];

  // Using the jwt.verify method, decode the payload
  jwt.verify(token, config.secret, (err, decoded) => {
    console.log(err);
    if (err) return res.status(403).json({
      success: false,
      message: 'Access denied'
    });

    // Search for the user using the decoded id
    User.findById(decoded.id, (err, user) => {
      if (err) return res.status(500).json({ success: false, message: 'Something went wrong.' });
      if (!user) return res.status(401).json({ success: false, message: 'Unauthorized.' });

      // Assign the user to the req which can now be accessed in further
      // middleware
      req.user = user;

      // Move onto the next piece of middleware
      return next();
    });
  });
}
