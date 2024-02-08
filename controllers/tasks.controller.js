const createError = require('http-errors');
const taskService = require('../services/tasks.service');

module.exports.list = (req, res, next) => {
  taskService.list()
    .then((tasks) => res.render('tasks/list', { tasks }))
    .catch((error) => next(error));
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  taskService.deleteById(id)
    .then((task) => {
      if (!task) {
        next(createError(404, 'Task not found'))
      } else {
        res.redirect('/tasks');
      }
    })
    .catch((error) => next(error));
} 
