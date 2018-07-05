var express = require('express');
var router = express.Router();
var client = require('../services/client');

var apiBaseUrl = global.CONF.apiBaseUrl;

router.get('/messages/:id', function(req, res, next) {
  res.redirect("/sermons/"+req.params.id);
});

router.get('/messages/:id/video', function(req, res, next) {
  res.redirect("/sermons/"+req.params.id);
});

module.exports = router; 
