var express = require('express');
var router = express.Router();
var client = require('../services/client');
var colors = ['Orange', 'Yellow', 'Olive', 'Green', 'Teal', 'Blue', 'Violet', 'Purple', 'Pink', 'Brown', 'Grey', 'Black'];


router.get('/', function(req, res, next) {
  const semronsPromise = new Promise(function(resolve, reject){
    client.get('/messages?descending=true', function(err, semrons) {
      if (err) {
        return reject(err);
      }
      var i = 0;
      semrons.forEach(function(item) {
        item.color = colors[i % colors.length].toLowerCase();
        item.title = item.title.replace('【讲台】', '');
        i++;
      });
      resolve(semrons);
    });
  });

  const booksPromise = new Promise(function(resolve, reject){
    client.get(apiUrls.ebook+'/books', function (err, books) {
      if(err){
        return reject(err);
      }
      resolve(books);
    });
  });

  Promise.all([semronsPromise, booksPromise]).then(function(results){
    const sermons = results[0];
    const books = results[1];
    res.render('home', {
      sermons: sermons,
      books: books
    });
  }, function(errs){
    next(errs);
  });

});

router.get('/test', function(req, res) {
  res.render('test', {});
});

module.exports = router;
