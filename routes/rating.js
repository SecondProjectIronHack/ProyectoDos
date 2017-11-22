var express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Rating = require('../models/Rating');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var router = express.Router();
const multer = require('multer');
const uploader = multer({dest:'./public/uploads'});

//Falta el detalle de cada Rating!

router.get('/:id', ensureLoggedIn(), (req, res, next) => {
  console.log(req.params.id);
  const id = req.params.id;
  var restaurant = {};
  Restaurant.findById(id, function (err, restaurant) {
    console.log(restaurant);
    res.render('rating/rate-form', {restaurant : restaurant});
   } );
});

router.post('/add/:id', ensureLoggedIn(), uploader.single('photo'), (req, res, next) => {

  let newRating = new Rating(Object.assign(req.body, {
    creator: req.user._id,
    restaurant: req.params.id,
    pic_name: req.file ? req.file.originalname : null,
    pic_path: req.file ? `../uploads/${req.file.filename}` : null,
  }));

  newRating.save().then( createdRating => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
      if(err) { return next(); }
      restaurant.visited = true;
      restaurant.save((err, updRestaurant) => {
        res.redirect("/");
      });
    });
  })
  .catch(e => {
    return res.render('error', {
      error: 'Something went wrong'
    });
  });

});

router.get('/:id', ensureLoggedIn(), (req, res, next) => {
  Rating.findById(req.params.id)
          .populate('creator')
          .populate('restaurant')
          .then( rating => {
            console.log(restaurant.restaurant.name);
            res.render('profile/dashboard',{rating});
          })
          .catch(e => next(e));
});

module.exports = router;
