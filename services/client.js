var Client = require('node-rest-client').Client;
var client = new Client();

var apiBaseUrl =  global.CONF.oldApiBaseUrl;

function getUrl(path){
  if(path.startsWith('http')){
    return path;
  }
  return apiBaseUrl + path;
}

exports.get = function(path, callback){
  console.log('dddd',getUrl(path));
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
