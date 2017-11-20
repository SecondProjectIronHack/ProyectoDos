var express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var router = express.Router();

router.get("/dashboard", ensureLoggedIn(), (req, res) => {
  res.render("profile/dashboard", { user: req.user });
});

module.exports = router;
