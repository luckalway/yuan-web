var Client = require('node-rest-client').Client;
var client = new Client();

var api2Url = 'http://localhost:8000/api/v1.0';

function getUrl(path){
  if(path.startsWith('http')){
    return path;
  }
  return api2Url + path;
}

exports.get = function(path, callback){
  client.get(getUrl(path), callback);
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
