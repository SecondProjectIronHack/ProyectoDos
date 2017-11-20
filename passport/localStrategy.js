const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use('local-signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, email, password, done) => {
    console.log("ARRIBA", done)
    process.nextTick(() => {
        User.findOne({
            'email': email
        }, (err, user) => {
            if (err){
              return done(err);
            }

            if (user) {
                return done(null, false);
            } else {
                const {username, email, password } = req.body;
                const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                const newUser = new User({
                  name : username,
                  email,
                  password: hashPass
                });
                newUser.save((err) => {
                  console.log("ERROR", err);
                  console.log("NEXT", next)
                  if (err){ return done(err); }
                  return done(null, newUser);
                });
            }
        });
    });
}));

passport.use('local-login', new LocalStrategy((email, password, next) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect email" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));
