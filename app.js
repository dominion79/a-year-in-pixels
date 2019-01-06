const createError = require('http-errors');
const express = require('express');
const expressNunjucks = require('express-nunjucks');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const {getYearData} = require('./middleware/get-year-data');
const app = express();

const isDev = app.get('env') === 'development';
const filename = './data/2019.yaml';


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

const njk = expressNunjucks(app, {
  watch: isDev,
  noCache: isDev
});

app.use(logger('dev'));
app.use(getYearData);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
