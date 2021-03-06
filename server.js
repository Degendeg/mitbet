/**
 * Namespaces
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');

/**
 * Elasticsearch
 */
var client = new elasticsearch.Client({
  host: 'localhost:9200/users/info'
});
var client2 = new elasticsearch.Client({
  host: 'localhost:9200'
});

/**
 * Public expose.
 */
app.use(express.static('public'));

/**
 * Home
 */
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/default.html');
});

/**
 * Points
 */
app.get('/points', function(req, res) {
  client.search({}).then(function(body) {
    var hits = body.hits.hits;
    res.send(hits);
  }, function(error) {
    console.trace(error.message);
  });
});

/**
 * Admin
 */
app.get('/admin', function(req, res) {
  res.sendFile(__dirname + '/public/admin.html');
});

/**
 * Admin - add user
 */
app.post('/admin/add', bodyParser.urlencoded({
  extended: false
}), function(req, res) {
  client2.index({
    index: "users",
    type: "info",
    body: {
      firstname: req.body.firstname,
      surname: req.body.surname,
      email: req.body.email,
      points: req.body.points
    }
  });
  res.send(200);
  console.log('user added: ' + req.body.email);
});

/**
 * Admin - edit user
 */
app.post('/admin/edit', bodyParser.urlencoded({
  extended: false
}), function(req, res) {
  // First delete...
  client2.bulk({
    body: [{
      delete: {
        _index: 'users',
        _type: 'info',
        _id: req.body.id
      }
    }, ]
  }, function(err, resp) {});
  // ...Then create
  client2.index({
    index: "users",
    type: "info",
    body: {
      firstname: req.body.firstname,
      surname: req.body.surname,
      email: req.body.email,
      points: req.body.points
    }
  });
  res.send(200);
  console.log('user edited!');
});

/**
 * Admin - delete user
 */
app.post('/admin/delete', bodyParser.urlencoded({
  extended: false
}), function(req, res) {
  client2.bulk({
    body: [{
      delete: {
        _index: 'users',
        _type: 'info',
        _id: req.body.id
      }
    }, ]
  }, function(err, resp) {});
  res.send(204);
  console.log('user deleted!');
});

/**
 * Init
 */
server.listen(port, function() {
  console.log('Server listening at port %d', port);
});