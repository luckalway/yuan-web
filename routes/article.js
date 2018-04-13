var express = require('express');
var router = express.Router();
var client = require('../services/client');

var apiUrlBase = global.CONF.apiUrlBase + '/ebooks/v1.0';

router.get('/:id', function(req, res, next) {
  client.get(apiUrlBase + '/articles/' + req.params.id, function (err, body) {
    if(err){
      return next(err);
    }
    res.render('article', body);
  });
});

module.exports = router;
