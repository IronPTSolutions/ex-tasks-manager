const express = require("express");
const issues = require("../controllers/issues.controller");
const users = require("../controllers/users.controller");

const router = express.Router();

// Issue CRUD
// Create
router.get("/create-issue", issues.create);
router.post("/create-issue", issues.doCreate);
// Read
router.get("/issues", issues.list);
router.get("/issues/:id", issues.detail);
// Update
router.get("/issues/:id/edit", issues.edit);
router.post("/issues/:id/edit", issues.doEdit);
// Delete
router.get("/issues/:id/delete", issues.delete);

// User CRUD

router.get("/login", users.login);
router.post("/login", users.doLogin);
// Create
router.get("/signup", users.create);
router.post("/signup", users.doCreate);

router.get("/", (req, res, next) => res.redirect("/issues"));

module.exports = router;
