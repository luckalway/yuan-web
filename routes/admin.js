var express = require('express');
var router = express.Router();
var client = require('../services/client');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var randomize = require('randomatic');
var mkdirp = require('mkdirp');
var urljoin = require('url-join');

var fileuploadConf = global.CONF.fileupload;
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

router.get('/users/new-user', function(req, res) {
  res.render('admin/new-user', {});
});

router.post('/users/000000', function(req, res) {
  var user = req.body;
  client.post(apiBaseUrl+'/users', user, function (doc) {
    res.redirect('/admin/users');
  });
});

router.get('/sermons', function(req, res, next){
  client.get(apiBaseUrl+'/messages', function (err, messages) {
    if(err){
      return next(err);
    }
    res.render('admin/sermons', {
      title: '讲台',
      messages:messages
    });
  });
});

router.get('/sermons/:id', function(req, res, next) {
  client.get(apiBaseUrl+'/messages/'+req.params.id, function (err, message) {
    if(err){
      return next(err);
    }

    res.render('admin/sermon', {
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

router.get('/books', function(req, res){
  res.render('admin/books', {
    title: '专著',
    messages:{}
  });
});

router.post('/books', function(req, res, next){
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.coverImage.path;
    var bookId = randomize('a0', 5);
    var filename = '' + new Date().getTime() + files.coverImage.name.substring(files.coverImage.name.indexOf('.'));
    var bookFolder = path.join(fileuploadConf.baseUploadDir, 'ebooks', bookId);
    mkdirp(bookFolder, function (err) {
      if (err) {
        return next(err);
      }
      fs.rename(oldpath, path.join(bookFolder,filename), function (err) {
        if (err) {
          return next(err);
        }
        fields.coverImage = urljoin(fileuploadConf.baseUploadUrl,'ebooks',bookId,filename);
        LOG.debug('A new file uploaded, path:%s, url:%s', path.join(bookFolder,filename), fields.coverImage);
        client.post(apiUrls.ebook+'/books', fields, function (book, response) {
          //LOG.debug(response);
          res.redirect('/admin/books/11/select-articles');
        });
      });
    });

  });
});

router.get('/books/new-book', function(req, res){
  res.render('admin/book/new-book', {
    title: '新建',
    messages:{}
  });
});

router.get('/books/:id/select-articles', function(req, res) {
  res.render('admin/book/select-articles', {});
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
