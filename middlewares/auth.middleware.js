const User = require("../models/user.model");

// TODO: store sessions into database
const sessions = [];

module.exports.sessions = sessions;

module.exports.loadUser = (req, res, next) => {
  const cookieHeader = req.headers.cookie;
  const sessionId = cookieHeader?.split("sessionId=")?.[1];

  // find session with sessionId in sessions array
  const session = sessions.find((session) => session.sessionId === sessionId);

  if (session) {
    User.findById(session.userId)
      .then((user) => {
        // store user so next middleware can access it
        req.user = user;
        res.locals.user = user;

        // call next middleware
        next();
      })
      .catch(next);
  } else {
    next();
  }
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};