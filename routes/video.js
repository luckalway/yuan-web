var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

var apiBaseUrl = 'https://api.8qiu.cn/api/v3';

router.get('/messages/:id', function(req, res, next) {
  console.log('tttttttt');
  var messageId = req.params.id.split('_')[0];
  var partNo = req.params.id.split('_')[1];
  client.get(apiBaseUrl+'/messages/' + messageId + '/videos', function (body, response) {
    body.message.parts.forEach(function(part){
      if(part.partNo == partNo){
        body.currentPart = part;
        part.active = 'active';
      }
    });
    res.render('video', body);
  });
});

router.get('/messages/:id/video', function(req, res, next) {
  res.redirect("/messsages/"+req.params.id);
});

module.exports = router;
