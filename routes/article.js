var express = require('express');
var router = express.Router();
var client = require('../services/client');

var apiUrlBase = global.CONF.apiUrlBase + '/ebooks/v1.0';

module.exports = router;
