var express = require('express');
var router = express.Router();
var client = require('../services/client');

var apiUrlBase = global.CONF.apiUrlBase + '/ebooks/v1.0';


router.get('/:id', function(req, res, next) {
    res.render('book/new-book', {});
});

module.exports = router;
