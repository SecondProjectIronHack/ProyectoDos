var express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

const multer = require('multer');
const uploader = multer({dest: './public/uploads'});
const {ensureLoggedIn,ensureLoggedOut} = require('connect-ensure-login');
var router = express.Router();

router.get("/", ensureLoggedIn(), (req, res) => {
  const id = req.user.id;

  Restaurant.
    find({creator : id}).
    populate('rating').
    exec( (err,restaurant) => {
      const ratio = [];
      restaurant.forEach(r => {
        ratio.push(r.rating);
      });
      if (err) return handleError(err);
      console.log(restaurant);
      console.log(ratio);
      res.render("profile/dashboard", {
        user: req.user,
        restaurants: restaurant.reverse(),
        rating : ratio.reverse()
      });
    });
  });

router.get('/visited',ensureLoggedIn(), (req, res) => {
  const id = req.user.id;

  Restaurant.
  find({visited : true}).
  populate('rating').
  exec( (err,restaurant) => {
    const ratio = [];
    restaurant.forEach(r => {
      ratio.push(r.rating);
    });
    if (err) return handleError(err);
    res.render("profile/dashboard", {
      user: req.user,
      restaurants: restaurant.reverse(),
      rating : ratio.reverse()
    });
  });
} );

router.get('/wannavisit',ensureLoggedIn(), (req, res) => {
  const id = req.user.id;

  Restaurant.
  find({visited : false}).
  populate('rating').
  exec( (err,restaurant) => {
    const ratio = [];
    restaurant.forEach(r => {
      ratio.push(r.rating);
    });
    if (err) return handleError(err);
    res.render("profile/dashboard", {
      user: req.user,
      restaurants: restaurant.reverse(),
      rating : ratio.reverse()
    });
  });
} );


router.get('/edit', ensureLoggedIn(), (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
    if (err) {
      console.log(err);
    }
    res.render('profile/edit-profile', {
      user: user
    });
  });
});

router.post('/edit', ensureLoggedIn(), uploader.single('photo'), (req, res, next) => {
  let updates = {};
  if (req.file !== undefined){
    updates = {
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      location: req.body.location,
      pic_name: req.file.originalname,
      pic_path: `../uploads/${req.file.filename}`,
      complete: true
    };
  } else {
    updates = {
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      location: req.body.location,
      complete: true
    };
  }

  User.findByIdAndUpdate(req.user._id, updates, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/profile');
  });
});

router.get('/logout', ensureLoggedIn(), (req, res) => {
  req.logout();
  res.redirect('/');
});

function checkComplete() {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.complete === false) {
      return next();
    } else {
      res.redirect('/');
    }
  };
}

// router.get('/completeprofile', checkComplete(), (req, res) => {
//   res.render('profile/complete-profile', {user: req.user});
// });
//
// //
// router.post('/completeprofile', ensureLoggedIn(), uploader.single('photo'), checkComplete(), (req, res) => {
//   console.log(req.file)
//   let completeProfile = {
//       fullName: req.body.fullName,
//       age: req.body.age,
//       gender: req.body.gender,
//       location: req.body.location,
//       complete: true,
//       photo: req.file.filename,
//     };
//     User.findByIdAndUpdate(req.user._id, updates, (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       res.redirect('/profile/complete-profile');
//     });
//   });
module.exports = router;
