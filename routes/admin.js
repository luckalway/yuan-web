var express = require('express');
var router = express.Router();
var client = require('../services/client');

var apiBaseUrl = 'http://localhost:8000/api/v4';

var api2Url = 'http://localhost:8000/api/v1.0';

router.get('/signIn', function(req, res) {
  res.render('admin/signIn', {});
});

router.get('/users', function(req, res) {
  client.get(api2Url+'/users', function (users) {
    console.log(users);
    res.render('admin/users', {users:users});
  });
});

router.get('/users/000000', function(req, res) {
  res.render('admin/new-user', {});
});

router.post('/users/000000', function(req, res) {
  var user = req.body;
  client.post(api2Url+'/users', user, function (doc) {
    res.redirect('/admin/users');
  });
});

router.get('/messages', function(req, res) {
  client.get(apiBaseUrl+'/messages', function (messages) {
    res.render('admin/messages', {messages:messages});
  });
});

router.get('/messages/:id', function(req, res) {
  client.get(apiBaseUrl+'/messages/'+req.params.id, function (message) {
    res.render('admin/message', {
      message: message,
      title: message.title
    });
  });
});

router.patch('/messages/:id', function(req, res) {
  client.patch(api2Url+'/messages/'+req.params.id, req.body, function (message) {
    res.status(200).end();
  });
});

module.exports = router;
