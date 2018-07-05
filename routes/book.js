var express = require('express');
var router = express.Router();
var client = require('../services/client');

router.get('/:id', function(req, res, next) {
  client.get(`${apiUrls.ebook}/books/${req.params.id}`, function(err, book) {
    if(err){
      return next(err);
    }
    res.render('book', book);
  });
});

router.get('/:id/articles', function(req, res, next) {
  res.redirect('/books/'+req.params.id);
});

router.get('/:bookId/articles/:articleId', function(req, res, next) {
  client.get(`${apiUrls.ebook}/books/${req.params.bookId}/articles/${req.params.articleId}`, function (err, body) {
    if(err){
      return next(err);
    }
    body.bookId = req.params.bookId;
    res.render('article', body);
  });
});

module.exports = router;
