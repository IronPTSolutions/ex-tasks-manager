const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.create = (req, res, next) => {
  res.render("users/signup");
};

module.exports.doCreate = (req, res, next) => {
  const user = { email: req.body.email, password: hash };

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({ email: req.body.email, password: hash })
        .then((user) => res.redirect("/login"))
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            res
              .status(400)
              .render("users/signup", { user, errors: error.errors });
          } else {
            next(error);
          }
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  res.render("users/login");
};

module.exports.doLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (result) {
          res.send("LOGIN OK");
        } else {
          res.send("LOGIN KO");
        }
      });
    })
    .catch(next);
};
