const User = require("../models/user.model");
const mongoose = require("mongoose");
const { sessions } = require("../middlewares/auth.middleware");

module.exports.create = (req, res, next) => {
  res.render("users/signup");
};

module.exports.doCreate = (req, res, next) => {
  const user = { email: req.body.email, password: req.body.password };

  User.create(user)
    .then((user) => res.redirect("/login"))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("users/signup", { user, errors: error.errors });
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  res.render("users/login");
};

module.exports.doLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      user.checkPassword(req.body.password).then((match) => {
        if (match) {
          const sessionId = Math.random().toString(36).substring(2, 15);
          sessions.push({ sessionId, userId: user.id });

          res.setHeader("Set-Cookie", `sessionId=${sessionId};`);
          res.redirect("/");
        } else {
          res.redirect("/login");
        }
      });
    })
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  res.render("users/profile");
};
