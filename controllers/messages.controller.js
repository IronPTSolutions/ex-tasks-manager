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