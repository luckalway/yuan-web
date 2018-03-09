var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

var oldApiBaseUrl = global.CONF.oldApiBaseUrl;

router.get('/messages/:id', function(req, res, next) {
  var messageId = req.params.id.split('_')[0];
  var partNo = req.params.id.split('_')[1];
  console.log(oldApiBaseUrl+'/messages/' + req.params.id + '/videos');
  client.get(oldApiBaseUrl+'/messages/' + req.params.id + '/videos', function (body, response) {
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
