var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

var apiBaseUrl = 'https://api.8qiu.cn/api/v4';

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
  client.get(apiBaseUrl+'/messages', function (messages, response) {
    res.render('admin/message', {messages:messages});
  });
});



module.exports = router;
