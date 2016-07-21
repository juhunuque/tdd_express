// Server created only for test purposes

var express = require('express');

// Here import all the routes that you're going to include in the testing
var routes = require('./../../routes/index');

var app = express();

// Map your routes
app.use('/', routes);

// Functions created in order to be invoked from the tests
var start = exports.start = function start(port, callback){
  server = app.listen(port, callback);
};

var stop = exports.stop = function stop(callback){
  server.close(callback);
};
