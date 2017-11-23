require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
const index = require('./routes/index');
const authRoute = require('./routes/auth');
const restaurantRoute = require('./routes/restaurant');
const profileRoute = require('./routes/profile');
const ratingRoute = require('./routes/rating');
const flash = require('connect-flash');

const dbURL = process.env.mongoDB;
console.log(dbURL);
mongoose.connect(dbURL).then(() => {
  debug(`Connected to ${dbURL}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'main-layout');

// default value for title local

app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(session({
  secret: 'holi capah que',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use(layouts);
app.use('/dist/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/dist/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist/materialize', express.static(path.join(__dirname, 'node_modules/materialize-css/dist')));


require('./passport')(app);

app.use((req, res, next) => {
  res.locals.title = "APP Capaz Que";
  res.locals.user = req.user;
  next();
});


app.use('/', index);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/restaurant', restaurantRoute);
app.use('/rating', ratingRoute);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
