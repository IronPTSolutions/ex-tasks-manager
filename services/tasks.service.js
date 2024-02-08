const Task = require('../models/task.model');

let tasks = [
  new Task('1', 'Clean code', 'bla bla', 'feature'),
  new Task('2', 'Sticky footer', 'bla bla', 'bug'),
]



module.exports.list = () => new Promise((resolve, reject) => resolve(tasks));

module.exports.deleteById = (id) => new Promise((resolve, reject) => {
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    resolve();
  } else {
    tasks = tasks.filter((task) => task.id !== id);
    resolve(task);
  }
});
