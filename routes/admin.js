var express = require('express');
var router = express.Router();
var client = require('../services/client');

var apiBaseUrl = global.CONF.apiBaseUrl2;

router.get('/signIn', function(req, res) {
  res.render('admin/signIn', {});
});

router.get('/users', function(req, res, next) {
  client.get(apiBaseUrl+'/users', function (err, users) {
    if(err){
      return next(err);
    }
    res.render('admin/users', {users:users});
  });
});

router.get('/users/000000', function(req, res) {
  res.render('admin/new-user', {});
});

router.post('/users/000000', function(req, res) {
  var user = req.body;
  client.post(apiBaseUrl+'/users', user, function (doc) {
    res.redirect('/admin/users');
  });
});

router.get('/messages', function(req, res, next) {
  client.get(apiBaseUrl+'/messages', function (err, messages) {
    if(err){
      return next(err);
    }
    res.render('admin/messages', {messages:messages});
  });
});

router.get('/messages/:id', function(req, res, next) {
  client.get(apiBaseUrl+'/messages/'+req.params.id, function (err, message) {
    if(err){
      return next(err);
    }

    res.render('admin/message', {
      message: message,
      title: message.title
    });
  });
});

router.patch('/messages/:id', function(req, res) {
  client.patch(apiBaseUrl+'/messages/'+req.params.id, req.body, function (message) {
    res.status(200).end();
  });
});

router.get('/articles', function(req, res, next) {
  client.get(apiUrls.ebook + '/articles', function (err, messages) {
    if(err){
      return next(err);
    }

    res.render('admin/articles', {messages:messages});
  });
});


module.exports = router;
