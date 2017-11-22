const express = require('express');
const router  = express.Router();
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCE3wzxrBK16zMljFyGq294DTotwbl85TY',
  Promise: Promise
});

function isLogged() {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      return next();
    }
  };
}

/* GET home page. */
router.get('/', isLogged(), (req, res, next) => {
    res.render('index');
});

// router.get('/map', (req, res, next) => {
//   googleMapsClient.place({placeid : "ChIJ8dOgjxspQg0Rvq6xUwtsUI4"}).asPromise()
//     .then((response) => {
//       console.log(response);
//       // const rest = new Restarant {
//       //   name : response.....
//       // }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   res.render('index');
// });

module.exports = router;
