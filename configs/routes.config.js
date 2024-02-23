const express = require("express");
const issues = require("../controllers/issues.controller");
const users = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Issue CRUD
// Create
router.get("/create-issue", authMiddleware.isAuthenticated, issues.create);
router.post("/create-issue", authMiddleware.isAuthenticated, issues.doCreate);
// Read
router.get("/issues", authMiddleware.isAuthenticated, issues.list);
router.get("/issues/:id", authMiddleware.isAuthenticated, issues.detail);
// Update
router.get("/issues/:id/edit", authMiddleware.isAuthenticated, issues.edit);
router.post("/issues/:id/edit", authMiddleware.isAuthenticated, issues.doEdit);
// Delete
router.get("/issues/:id/delete", authMiddleware.isAuthenticated, issues.delete);

// User CRUD

router.get("/login", users.login);
router.post("/login", users.doLogin);
// Create
router.get("/signup", users.create);
router.post("/signup", users.doCreate);

router.get("/profile", authMiddleware.isAuthenticated, users.profile);

router.get("/", (req, res, next) => res.redirect("/issues"));

module.exports = router;
