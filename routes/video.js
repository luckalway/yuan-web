var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

var apiBaseUrl = 'http://admin.8qiu.cn/api/v3';

router.get('/messages/:id', function(req, res, next) {
  var messageId = req.params.id.split('_')[0];
  var partNo = req.params.id.split('_')[1];
  console.log(apiBaseUrl+'/messages/' + req.params.id + '/videos');
  client.get(apiBaseUrl+'/messages/' + req.params.id + '/videos', function (body, response) {
    body.parts.forEach(function(part){
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
