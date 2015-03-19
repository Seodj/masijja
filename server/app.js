var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var debug = require('debug')('ex:server');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({upload : 'multipart'}));

//cross domain issue
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

//image upload 설정
app.use(bodyParser({uploadDir : "./files"}))
app.use(express.static(path.join(__dirname, '../public')));
app.use('/files', express.static('./files'));

app.get('/', function(req, res) {
  console.log(__dirname + "   " + path.join(__dirname, '../public'));
  res.sendfile('index.html');
});

app.use('/users', require('./routes/user'));
app.use('/groups', require('./routes/group'));
app.use('/foods', require('./routes/food'));
app.use('/access', require('./routes/accessinfo'));
app.use('/mock', require('./routes/mock'));
app.use('/upload', require('./routes/upload'));

var server = app.listen(3001, function() {
  mongoose.connect('mongodb://localhost/masijja');
  console.log('Listening on port %d', server.address().port);
});


server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.jsonp('error', {
        message: err.message,
        error: {}
    });
});