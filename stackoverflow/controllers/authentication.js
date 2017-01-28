module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin,
  tokenAndRole: verifyTokenAndGetRole
};

const User           = require('../model/user');
const config         = require('../config/config');
const jwt            = require('jsonwebtoken');         // used to create, sign, and verify tokens

function authenticationsRegister(req, res){
  const newUser = new User(req.body.user);
  newUser['role'] = 'USER'; //by default
  newUser.save((err, user) => {
    if (err) return res.status(500).json({success: false, message: `${err}`});

    const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 60 * 60} );
    return res.status(201).json({success: true, message: `Welcome ${user.name}!`, user, token});
  });
}

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
function verifyTokenAndGetRole(req, res, next){
  let token = '';
  if(req.headers && req.headers['authorization'] && req.headers['authorization'].split(' ').length === 2){
    token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if(err) return res.status(403).json({success: false, message: 'Access denied'}); //FORBIDEN ACCESS

      User.findById(decoded.id, (err, user) => {
        if (err) return res.status(500).json({success: false, message: 'Something went wrong.' });
        if (!user) return res.status(401).json({success: false, message: 'Unauthorized.' });

        req.decoded = decoded; // We store in the req
        req.role = user.role; //We recover the role of the user from the database
        return next();
      });
    });
  }else{
    req.role = ''; //if there is not a TOKEN, so he is not a USER
    return next();
  }
}
