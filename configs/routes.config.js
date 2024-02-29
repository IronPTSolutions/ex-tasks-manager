const express = require('express');
const issues = require('../controllers/issues.controller');
const users = require('../controllers/users.controller');
const messages = require('../controllers/messages.controller');
const secure = require('../middlewares/auth.middleware');

const router = express.Router();

// Issue CRUD
// Create
router.get('/create-issue', secure.isAuthenticated, issues.create);
router.post('/create-issue', secure.isAuthenticated, issues.doCreate);
// Read
router.get('/issues', secure.isAuthenticated, issues.list);
router.get('/issues/:id', secure.isAuthenticated, issues.detail);
// Update
router.get('/issues/:id/edit', secure.isAuthenticated, issues.edit);
router.post('/issues/:id/edit', secure.isAuthenticated, issues.doEdit);
// Delete
router.get('/issues/:id/delete', secure.isAuthenticated, issues.delete);

router.post('/issues/:issueId/messages', secure.isAuthenticated, messages.doCreate);

// User CRUD
router.get('/login', users.login);
router.post('/login', users.doLogin);
router.get('/logout', users.logout);
// Create
router.get('/signup', users.create);
router.post('/signup', users.doCreate);

router.get('/profile', secure.isAuthenticated, users.profile);

router.get('/', (req, res, next) => res.redirect('/issues'));

module.exports = router;
