const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use('local-signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, next) => {
    process.nextTick(() => {
        User.findOne({
            'name': name
        }, (err, user) => {
            if (err){ return next(err); }

            if (user) {
                return next(null, false);
            } else {
                const {email, password } = req.body;
                const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                const newUser = new User({
                  name,
                  email,
                  password: hashPass
                });

                newUser.save((err) => {
                    if (err){ next(err); }
                    return next(null, newUser);
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
