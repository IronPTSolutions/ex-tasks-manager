const createError = require("http-errors");
const mongoose = require("mongoose");
const Issue = require("../models/issue.model");
const User = require("../models/user.model");

module.exports.list = (req, res, next) => {
  const { title, type, priority } = req.query;
  const criterial = {};
  if (title) criterial.title = new RegExp(title, 'i');
  if (type && type.toLowerCase() !== 'all') criterial.type = type;
  if (priority && priority.toLowerCase() !== 'all') criterial.priority = priority;

  Issue.find(criterial) 
    .sort({ priority: 1 })
    .then((issues) => res.render("issues/list", { issues }))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  Issue.findById(id)
    .then((issue) => {
      if (!issue) {
        next(createError(404, "Issue not found"));
      } else if (issue.owner != req.user.id) {
        next(createError(403, "Forbidden"));
      } else {
        return Issue.deleteOne({ _id: id })
          .then(() => res.redirect("/issues"))
      }
    })
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => res.render("issues/create");

module.exports.doCreate = (req, res, next) => {
  const issue = req.body;
  issue.owner = req.user.id;

  Issue.create(issue)
    .then((issue) => res.redirect("/issues"))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(400)
          .render("issues/create", { issue, errors: error.errors });
      } else {
        next(error);
      }
    });
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  Issue.findById(id)
    .populate('owner')
    .populate({
      path: 'messages',
      populate: {
        path: 'owner',
        select: 'email'
      }
    })
    .then((issue) => {
      if (!issue) {
        next(createError(404, "Issue not found"));
      } else {
        res.render("issues/detail", { issue });
      }
    })
    .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
  Issue.findById(req.params.id)
    .then((issue) => {
      if (!issue) {
        next(createError(404, "Issue not found"));
      } else {
        res.render("issues/edit", { issue });
      }
    })
    .catch(next);
};

module.exports.doEdit = (req, res, next) => {
  const issue = req.body;
  issue.id = req.params.id;

  Issue.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((issue) => {
      if (!issue) {
        next(createError(404, "Issue not found"));
      } else {
        res.redirect(`/issues/${issue.id}`);
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(400)
          .render("issues/edit", { issue: req.body, errors: error.errors });
      } else {
        next(error);
      }
    });
};
