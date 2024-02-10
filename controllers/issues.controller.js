const createError = require('http-errors');
const Issue = require('../models/issue.model');

module.exports.list = (req, res, next) => {
  Issue.find()
    .then((issues) => res.render('issues/list', { issues }))
    .catch((error) => next(error));
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  Issue.findByIdAndDelete(id)
    .then((issue) => {
      if (!issue) {
        next(createError(404, 'Issue not found'))
      } else {
        res.redirect('/issues');
      }
    })
    .catch((error) => next(error));
} 
