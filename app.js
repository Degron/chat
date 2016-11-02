var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var HttpError = require('./error').HttpError;


var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/template'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  if (req.url === '/') {
    res.end("Hello!");
  } else {
    next();
  };
});

app.use(function (req, res, next) {
  if (req.url === '/test') {
    res.end("Test!");
  } else {
    next();
  };
});

app.use(require('./middleware/sendHttpError'));

// app.use('/', routes);
// app.use('/users', users);


require('./routes')(app);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace

app.use(function (err, req, res, next) {
  if (typeof err === 'number') {
    err = new HttpError(err);
  }
  if (err instanceof HttpError) {
    res.send(err)
  } else {
    if (app.get('env') === 'development') {
      res.send(err);
    } else {
      res.send(500);
    };
  };
});



module.exports = app;
