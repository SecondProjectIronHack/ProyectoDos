const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  },
  (req, username, password, next) => {
    process.nextTick(() => {
      let userEmail = req.body.email;
      User.findOne({ 'email': userEmail }, (err, user) => {
        if (err) { return next(err);}
        if (user) { return next(null, false, {
          message: "The user already exists"
        });
        } else {
          const { username, email, password } = req.body;
          const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
          const newUser = new User({
            name: username,
            email: email,
            password: hashPass
          });
            newUser.save(function(err) {
                   if (err)
                       throw err;
                   return next(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy((username, password, next) => {
    console.log(username);
    User.findOne({ 'name' : username }, (err, user) => {
      if (err) {

        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user);
    });
  }));
