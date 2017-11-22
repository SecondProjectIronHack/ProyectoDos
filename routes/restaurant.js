var express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var router = express.Router();


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

//Delete restaurant

router.post('/:id/delete', ensureLoggedIn(), (req, res, next) => {
  const id = req.params.id;
  Restaurant.findByIdAndRemove(id, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/profile');
  });

});


module.exports = router;
