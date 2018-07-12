var Client = require('node-rest-client').Client;
var client = new Client();

var apiBaseUrl =  global.CONF.apiBaseUrl2;

function getUrl(path){
  if(path.startsWith('http')){
    return path;
  }
  return apiBaseUrl + path;
}

exports.get = function(path, callback){
  var url = getUrl(path);
  client.get(url, function(data, response){
    if(response.statusCode != 200){
      return callback('Exception on get request for "'+url+'": '+response.statusCode+', '+response.description);
    }
    LOG.debug('Get request on '+url+', status:'+response.statusCode);
    return callback(null, data);
  });
};

exports.post = function(path, data, callback){
  var args = {
    data: data,
    headers: { "Content-Type": "application/json" }
  };
  LOG.debug('Post request on %s with the body:', getUrl(path), data);
  client.post(getUrl(path), args, callback);
};

exports.put = function(path, data, callback){
  var args = {
    data: data,
    headers: { "Content-Type": "application/json" }
  };
  LOG.debug('Put request on %s with the body:', getUrl(path), data);
  client.put(getUrl(path), args, callback);
};

exports.patch = function(path, data, callback){
  var args = {
    data: data,
    headers: { "Content-Type": "application/json" }
  };
  client.patch(getUrl(path), args, callback);
};
