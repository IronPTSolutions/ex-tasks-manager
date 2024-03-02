const createError = require('http-errors');
const Message = require('../models/message.model');
const Issue = require('../models/issue.model');
const mongoose = require('mongoose');

module.exports.doCreate = (req, res, next) => {
  const { issueId } = req.params;
  Issue.findById(issueId)
    .then((issue) => {
      if (!issue) {
        next(createError(404, 'Issue not found'));
      } else {
        const message = req.body;
        message.owner = req.user.id;
        message.issue = issueId;
        return Message.create(message)
          .then(() => res.redirect(`/issues/${issueId}`))
          .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.status(400).render('issues/detail', { issue, errors: error.errors, message: req.body })
            } else {
              next(error);
            }
          });
      }
    }).catch(next);
}

module.exports.doDelete = (req, res, next) => {
  const { issueId, id } = req.params;
  Issue.findById(issueId)
    .then((issue) => {
      if (!issue) {
        next(createError(404, 'Issue not found'));
      } else {
        const message = req.body;
        message.owner = req.user.id;
        message.issue = issueId;
        return Message.findOne({ _id: id, issue: issueId })
          .then((message) => {
            if (!message) {
              next(createError(404, 'Message not found'));
            } else if (message.owner != req.user.id) {
              next(createError(403, 'Forbidden'));
            } else {
              return Message.deleteOne({ _id: id })
                .then(() => res.redirect(`/issues/${issueId}`))
            }
          })
      }
    }).catch(next);
}