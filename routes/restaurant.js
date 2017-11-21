var express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var router = express.Router();

router.get('/search', (req, res, next) => {
  res.render('/restaurants/search-restaurant');
}

router.post('/search', (req, res, next) => {
  let addingRestaurant = {req.body.name;   }  
})
