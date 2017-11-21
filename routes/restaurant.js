var express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var router = express.Router();

//FALTA UN ensureLoggedIn EN TODAS!!
//No funciona el primer get no se por que--> dice que la vista no existe
//Hay que revisar el modelo de restaurante a ver si nos queremos traer mas informacioN!

router.get('/search', ensureLoggedIn(), (req, res, next) => {
  res.render('restaurants/search-restaurant');
});

router.post('/search', ensureLoggedIn(), (req, res, next) => {
  const newRestaurant = new Restaurant({
    name: req.body.name,
    address: req.body.address,
    website: req.body.website,
    type: req.body.type,
    rating: req.body.rating,
  });
  console.log(newRestaurant);
  console.log(req.body);
  newRestaurant.save().then(createdRestaurant => {
    // res.redirect(`/${createdRestaurant._id}`);
    res.redirect('/profile');
  }).catch(e => res.render('restaurants/search-restaurant', {
    error: 'Something went wrong'
  }));
});

module.exports = router;
