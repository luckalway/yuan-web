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
  form.parse(req, function (err, bookObj, files) {
    if(!files.coverImage){
      return next('The coverImage is required!');
    }
    let oldpath = files.coverImage.path;
    let bookId = randomize('a0', 5);
    let filename = '' + new Date().getTime() + files.coverImage.name.substring(files.coverImage.name.indexOf('.'));
    let bookFolder = path.join(fileuploadConf.baseUploadDir, 'ebooks', bookId);
    mkdirp(bookFolder, function (err) {
      if (err) {
        return next(err);
      }
      fs.rename(oldpath, path.join(bookFolder,filename), function (err) {
        if (err) {
          return next(err);
        }
        bookObj.coverImage = urljoin(fileuploadConf.baseUploadUrl,'ebooks',bookId,filename);
        LOG.debug('A new file uploaded, path:%s, url:%s', path.join(bookFolder,filename), bookObj.coverImage);
        client.post(apiUrls.ebook+'/books', bookObj, function (book, response) {
          res.redirect(`/admin/books/${bookId}/select-articles?category=${bookObj.category}`);
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

router.get('/books/:id/select-articles', function(req, res, next) {
  client.get(apiUrls.ebook+'/mp-articles?category='+req.query.category, function (err, articles) {
    if(err){
      return next(err);
    }
    res.render('admin/book/select-articles', {'articles':articles});
  });
});

router.post('/books/:id/select-articles', function(req, res, next) {
  req.session.selectedArticles = JSON.parse(req.body.articleTitles);
  res.send({
    status: 'success',
    redirectUrl: `/admin/books/${req.params.id}/modify-articles-title`
  });
  res.status(200).end();
});

router.get('/books/:id/modify-articles-title', function(req, res, next) {
  res.render('admin/book/modify-articles-title', {
    bookId: req.params.id,
    selectedArticles:req.session.selectedArticles
  });
});

router.put('/books/:id', function(req, res, next) {
  client.put(`${apiUrls.ebook}/books/${req.params.id}`, {
    action: 'addArticles',
    articleTitles: JSON.parse(req.body.articleTitles)
  }, function (response) {
    res.send(response);
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
