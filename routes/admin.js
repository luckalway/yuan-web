var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

var apiBaseUrl = 'http://localhost:8000/api/v4';

var api2Url = 'http://localhost:8000/api/v1.0';

router.get('/users', function(req, res) {
  client.get(apiBaseUrl+'/messages', function (messages, response) {
    res.render('admin/users', {messages:messages});
  });
});

router.get('/messages', function(req, res) {
  client.get(apiBaseUrl+'/messages', function (messages, response) {
    res.render('admin/messages', {messages:messages});
  });
});

router.get('/messages/:id', function(req, res) {
  console.log(apiBaseUrl+'/messages/'+req.params.id);
  client.get(apiBaseUrl+'/messages/'+req.params.id, function (message, response) {
    console.log(message);
    res.render('admin/message', {
      message: message,
      title: message.title
    });
  });
});

router.patch('/messages/:id', function(req, res) {
  var args = {
    data: req.body,
    headers: { "Content-Type": "application/json" }
  };
  client.patch(api2Url+'/messages/'+req.params.id, args, function (message, response) {
    console.log(message);
    res.status(200).end();
  });
});


module.exports = router;
