var express = require('express');
const passport = require('passport');
const User = require('../models/User');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var router = express.Router();

router.get("/", ensureLoggedIn(), (req, res) => {
  res.render("profile/dashboard", { user: req.user });
});

router.get('/:id/edit', (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
    console.log(req.user._id);
      if (err) {
        console.log(err);
      }
      res.render('profile/edit-profile', {user: user});
      });
    });

router.post('/:id/edit', (req, res, next) => {
  let updates = {
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
       // pic_path: `../uploads/${req.file.filename}`,
       // pic_name: req.file.originalname
     };
     User.findByIdAndUpdate(req.user._id, updates, (err, result) => {
       if (err) {
         console.log(err);
       }
       res.redirect('/profile');
     });
   });


module.exports = router;
