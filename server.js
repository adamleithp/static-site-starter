var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', 3000);
var root = '_site/';

app.use('/css', express.static(path.join(__dirname, root + 'css')));
app.use('/images', express.static(path.join(__dirname, root + 'images')));
app.use('/js', express.static(path.join(__dirname, root + 'js')));
app.use(express.static(path.join(__dirname, root)));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  // Set port
  var port = server.address().port;
  // Pretty console log
  var serverStatus = '✔ Server running on: localhost:' + port;

  console.log('\x1b[32m', serverStatus);
});
