var express = require('express');
var router = express.Router();
var client = require('../services/client');

var apiBaseUrl = global.CONF.apiBaseUrl;

router.get('/messages/:id', function(req, res, next) {
  var messageId = req.params.id.split('_')[0];
  var partNo = req.params.id.split('_')[1];
  client.get(apiBaseUrl+'/messages/' + req.params.id + '/videos', function (err, body) {
    if(err){
      return next(err);
    }

    body.parts.forEach(function(part){
      part.title = body.message.title; 
      var countOfParts = parseInt(body.message.countOfParts);
      if(countOfParts >1 ){
        part.title += '(' + part.partNo + '/' + countOfParts + ')'
      }

      if(part.partNo == partNo){
        body.currentPart = part;
        part.active = 'active';
      }
    });
    body.title = body.message.title;
    res.render('video', body);
  });
});

router.get('/messages/:id/video', function(req, res, next) {
  res.redirect("/messages/"+req.params.id);
});

module.exports = router;
