const createError = require('http-errors');
const mongoose = require('mongoose');
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

module.exports.create = (req, res, next) => res.render('issues/create');

module.exports.doCreate = (req, res, next) => {
  console.log(req.body);
  const issue = req.body;
  Issue.create(issue)
    .then((issue) => res.redirect('/issues'))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('issues/create', { issue, errors: error.errors })
      } else {
        next(error);
      }
    });
}

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  Issue.findById(id)
    .then((issue) => {
      if (!issue) {
        next(createError(404, 'Issue not found'));
      } else {
        res.render('issues/detail', { issue })
      }
    })
    .catch((error) => next(error));
}