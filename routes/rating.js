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
  let newRating = {};
  console.log("REST", req.params.id);
  console.log("USER", req.user.username);
  console.log("USERNAME", req.body.user);
  if (req.file !== undefined){
  const {food, price, ambience, comment, customerService, occasion, creator} = req.body;
    newRating = new Rating({
      food, price, ambience, comment, customerService, occasion,
      restaurant: req.params.id,
      pic_name: req.file.originalname,
      pic_path: `../uploads/${req.file.filename}`,
    });
}else {
  const {food, price, ambience, comment, customerService, occasion} = req.body;
    newRating = new Rating({
      food, price, ambience, comment, customerService, occasion,
      restaurant: req.params.id,
      creator: req.body.user,
  });
}

console.log("AQUI", newRating);

  newRating.save()
  .then(createdRating => {
    console.log(createdRating);
    res.redirect("/");
    })
  .catch(e => res.render('error', {
      error: 'Something went wrong'
    }));
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
