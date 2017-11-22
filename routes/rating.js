var express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Rating = require('../models/Rating')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var router = express.Router();
const multer = require('multer');
const uploader = multer({dest:'./public/uploads'});

//Falta el detalle de cada Rating!

router.get('/:id', ensureLoggedIn(), (req, res, next) => {
  console.log(req.params.id);
  const id = req.params.id;
  var restaurant = {};
  var creator =
  Restaurant.findById(id, function (err, restaurant) {
    console.log(restaurant)
    res.render('rating/rate-form', {restaurant : restaurant});
   } );
});

router.post('/', ensureLoggedIn(), uploader.single('photo'), (req, res, render) => {
  let torate = {};
  if (req.file !== undefined){
  const {food, price, ambience, comment, customerService, occasion} = req.body;
  const newRating = new Rating({
      food, price, ambience, comment, customerService, occasion,
      restaurant: req.restaurant._id,
      creator: req.user.username,
      pic_name: req.file.originalname,
      pic_path: `../uploads/${req.file.filename}`,
    });
}else {
  const {food, price, ambience, comment, customerService, occasion} = req.body;
  const newRating = new Rating({
      food, price, ambience, comment, customerService, occasion,
      restaurant: req.restaurant._id,
      creator: req.user.username,
  });
}
  console.log(req.restaurant);

  newRating.save().then(createdRating => {
      res.redirect(`/${createdRating._id}`);
    }).catch(e => res.render('/', {
      error: 'Something went wrong'
    }));
  });

router.get('/:id', ensureLoggedIn(), (req, res, next) => {
  Rating.findById(req.params.id)
          .populate('creator')
          .populate('restaurant')
          .then( rating => {
            console.log(restaurant.restaurant.name);
            res.render('profile/dashboard',{rating})
          })
          .catch(e => next(e));
});

module.exports = router;
