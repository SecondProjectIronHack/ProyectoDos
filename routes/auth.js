var express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var router = express.Router();


router.get('/signup', ensureLoggedOut(), (req, res, next)  => {
  res.render('auth/signup', { "message": req.flash("error") });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile/completeprofile',
  failureRedirect : '/auth/signup',
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/login', ensureLoggedOut(), (req, res, next) => {
  res.render('auth/login'), { "message": req.flash("error") };
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successReturnToOrRedirect:'/profile',
  failureRedirect : '/auth/login',
  failureFlash: true,
  passReqToCallback: true
}));



module.exports = router;
