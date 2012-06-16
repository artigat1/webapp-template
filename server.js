var express = require('express');
var app = express.createServer();

// use winston for logging
var winston = require('winston');

// Configuration
//basic html handling as jade
app.register('.html', require('jade'));

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
});


app.configure('dev', function () {
  app.use(express.static(__dirname + '/webapp'));
  app.use(express.static(__dirname + '/test'));
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure('prod', function () {
  app.use(express.static(__dirname + '/public'))
  winston.handleExceptions();
});

app.listen(3000);

console.log('Server running at http://127.0.0.1:3000/');