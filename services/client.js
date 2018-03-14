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
  client.get(getUrl(path), function(data, repsonse){
    if(repsonse.statusCode != 200){
      return callback('Exception on get request for "'+getUrl(path)+'": '+repsonse.statusCode+', '+repsonse.description);
    }
    return callback(null, data);
  });
}

exports.post = function(path, data, callback){
  var args = {
    data: data,
    headers: { "Content-Type": "application/json" }
  };
  client.post(getUrl(path), args, callback);
}

exports.patch = function(path, data, callback){
  var args = {
    data: data,
    headers: { "Content-Type": "application/json" }
  };
  client.patch(getUrl(path), args, callback);
}
