require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require('uglify-js');
var fs = require('fs');
var passport = require('passport');

require('./app_api/models/db'); //no exports, so no need to assign to a var
require('./app_api/config/passport');

var routesApi = require('./app_api/routes/index');

var app = express();

//compress js files
var appClientFiles = [
    'app_client/app.js',
    'app_client/home/home.controller.js',
    'app_client/about/about.controller.js',
    'app_client/common/directives/navigation/navigation.controller.js',
    'app_client/locationDetail/locationDetail.controller.js',
    'app_client/reviewModal/reviewModal.controller.js',
    'app_client/auth/register/register.controller.js',
    'app_client/auth/login/login.controller.js',
    'app_client/common/services/geolocation.service.js',
    'app_client/common/services/wifilocData.service.js',
    'app_client/common/services/auth.service.js',
    'app_client/common/filters/formatDistance.filter.js',
    'app_client/common/filters/addHtmlLineBreaks.filter.js',
    'app_client/common/directives/ratingStars/ratingStars.directive.js',
    'app_client/common/directives/navigation/navigation.directive.js',
    'app_client/common/directives/pageHeader/pageHeader.directive.js',
    'app_client/common/directives/footerGeneric/footerGeneric.directive.js',
];
var uglified = uglifyJs.minify(appClientFiles, { compress: false });

fs.writeFile('public/javascripts/wifiloc.min.js', uglified.code, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('Script generated and saved: wifiloc.min.js');
    }
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
//express will look for the file in both dirs

app.use(passport.initialize());
app.use('/api', routesApi);
//catch all page requests that are not api-related and serve index.html
app.use(function(req, res) {
    res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
//catch unauthorized errors
app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ': ' + err.message });
    }
});
//catch other errors
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
