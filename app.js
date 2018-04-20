var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');
var merge = require('merge');
var moment = require('moment');
var log4js = require('log4js');

var app = express();

var env = merge.recursive(require('./env-default'), require('./env-'+app.get('env')));
global.CONF = env.conf;
global.apiUrls = global.CONF.apiUrls;
global.LOG = log4js.getLogger();
LOG.level = app.get('env')=='production'?'info':'debug';

var index = require('./routes/index');
var video = require('./routes/video');
var song = require('./routes/song');
var article = require('./routes/article');
var admin = require('./routes/admin');

// view engine setup
app.engine('html', hbs.express4({
  extname: ".html",
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.videoUrl = env.conf.videoUrl;
  res.removeHeader("X-Powered-By");
  next();
});

app.use('/', index);
app.use('/', video);
app.use('/songs', song);
app.use('/articles', article);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if(typeof(err) == 'string'){
    res.locals.message = err;
  }else if(err.message){
    res.locals.message = err.message;
  }

  res.locals.error = req.app.get('env') === 'development' ? err : {};
  LOG.error(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

hbs.registerHelper('date', function(text, options){
  var format = options.format || 'YYYY-MM-DD';
  var ms = text;
  if(options.unit == 's'){
    ms = text * 1000;
  }
  return moment(ms).format(format);
});

module.exports = app;
