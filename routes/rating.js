var express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Rating = require('../models/Rating')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var router = express.Router();
const multer = require('multer');
const uploader = multer({dest:'./public/uploads'});

//FALTA UN ensureLoggedIn EN TODAS!!
//FALTA el formulario de Rating
//Falta el detalle de cada Rating!

router.get('/', (req, res, next) => {
  res.render('rating/rate-form');
});

router.post('/', uploader.single('photo'), (req, res, render) => {
  const {food, price, ambience, comment, customerService, occasion} = req.body;
  const newRating = new Rating({
      food, price, ambience, comment, customerService, occasion,
      restaurant: req.restaurant.name,
      creator: req.user.username,
      photo: req.file.filename,
    });

    console.log(req.restaurant.name);
    console.log(req.body);

  newRating.save().then(createdRating => {
      res.redirect(`/${createdRating._id}`);
    }).catch(e => res.render('/', {
      error: 'Something went wrong'
    }));
  });

router.get('/:id', (req, res, next) => {
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
