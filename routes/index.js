var express = require('express');
var router = express.Router();
var client = require('../services/client');
var colors = ['Orange', 'Yellow', 'Olive', 'Green', 'Teal', 'Blue', 'Violet', 'Purple', 'Pink', 'Brown', 'Grey', 'Black'];


router.get('/', function(req, res) {
  client.get('/messages?descending=true', function(err, messages) {
    if (err) {
      return next(err);
    }
    var i = 0;
    messages.forEach(function(item) {
      item.color = colors[i % colors.length].toLowerCase();
      item.title = item.title.replace('【讲台】', '');
      i++;
    });

    res.render('home', {
      messages: messages
    });
  });
});

router.get('/test', function(req, res) {
  res.render('test', {});
});

module.exports = router;
