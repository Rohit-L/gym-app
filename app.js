/*************************************************************************
 * Rohit Lalchandani
 *
 *************************************************************************
 *
 * @description Server logic
 *
 *
 * @author Rohit Lalchandani
 *
 *
 *************************************************************************/

/************************
 * Creates a web server *
 ************************/
var express = require('express'), // Creates an express instance
    app = express(),
    server = require('http').createServer(app), // Creates a web server
    io = require('socket.io').listen(server); // Creates a socket.io instance

server.listen(process.env.PORT || 3000); // Listening port for server
console.log("Listening at localhost:3000");

/* Serve static content */
app.use(express.static('public'));

/* Set Jade view engine */
app.set('view engine', 'jade');

// Routing for webpages
app.get('/', function(req, res) {
  //res.sendfile("chessboard.html");
  res.render('index');
});

app.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

// Database Setup
var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
})
