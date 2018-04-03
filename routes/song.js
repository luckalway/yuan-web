var express = require('express');
var router = express.Router();
var client = require('../services/client');

var apiBaseUrl = global.CONF.apiBaseUrl;

router.get('/:id', function(req, res, next) {
  res.render('song', {});
});

router.get('/', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
