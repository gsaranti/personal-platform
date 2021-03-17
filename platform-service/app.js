const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');

const indexRouter   = require('./routes/index');
const playoutRouter = require('./routes/playout');

const app = express();

const utils = require('./src/utils');
utils.setPublicVideos().then(() => {
  console.log('Public videos set');
}).catch((err) => {
  console.error(err.toString());
});

utils.buildVideoDirectoryStructure().then(() => {
  console.log('Video directory structure built');
}).catch((err) => {
  console.error(err.toString());
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/playout', playoutRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
