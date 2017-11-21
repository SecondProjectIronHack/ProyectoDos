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
    console.log(req.user);

      if (err) {
        console.log(err);
      }
      res.render('profile/edit-profile', {user: user});
      });
    });

router.post('/:id/edit', (req, res, next) => {
  let updates = {
       name: req.body.username,
       email: req.body.email
       // pic_path: `../uploads/${req.file.filename}`,
       // pic_name: req.file.originalname
     };
     console.log(updates)

     User.findByIdAndUpdate(req.user._id, updates, (err, result) => {
       if (err) {
         console.log(err);
       }
       res.redirect('/profile');
     });
   });


module.exports = router;
