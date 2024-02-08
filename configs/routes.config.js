const express = require('express');
const tasks = require('../controllers/tasks.controller');

const router = express.Router();

router.get('/tasks', tasks.list);
router.get('/tasks/:id/delete', tasks.delete);

router.get('/', (req, res, next) => res.redirect('/tasks'));

module.exports = router;
