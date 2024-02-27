const User = require('../models/user.model');
const mongoose = require('mongoose');
const { sessions } = require('../middlewares/auth.middleware');

module.exports.create = (req, res, next) => {
  res.render('users/signup');
};

module.exports.doCreate = (req, res, next) => {
  const user = { email: req.body.email, password: req.body.password };

  User.findOne({ email: user.email })
    .then((user) => {
      if (user) {
        res.status(409).render('users/signup', { user, errors: { email: 'Already exists'} });
      } else {
        return User.create(user)
          .then(() => res.redirect('/login'))
      }
    }).catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('users/signup', { user, errors: error.errors });
      } else {
        next(error);
      }
    });    
};

module.exports.login = (req, res, next) => {
  res.render('users/login');
};

module.exports.doLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).render('users/login', { user: req.body, errors: { password: 'Invalid email or password'} })
      } else {
        return user.checkPassword(req.body.password)
          .then((match) => {
            if (match) {
              req.session.userId = user.id;
              res.redirect('/issues');
            } else {
              res.status(401).render('users/login', { user: req.body, errors: { password: 'Invalid email or password' } })
            }
          })
      }
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  req.session = null;
  res.clearCookie("connect.sid");
  res.redirect('/login');
}

module.exports.profile = (req, res, next) => {
  res.render('users/profile');
};
