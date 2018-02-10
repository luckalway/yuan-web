var Client = require('node-rest-client').Client;
var client = new Client();

exports.get = function(url, callback){
  client.get(url, callback);
}

exports.post = function(url, data, callback){
  var args = {
    data: data,
    headers: { "Content-Type": "application/json" }
  };
  client.post(url, args, callback);
}

exports.patch = function(url, data, callback){
  var args = {
    data: data,
    headers: { "Content-Type": "application/json" }
  };
  client.patch(url, args, callback);
}
