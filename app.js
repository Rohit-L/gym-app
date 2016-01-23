/*************************************************************************
 * GymRec - Workout Logger
 *************************************************************************
 * @description Server logic
 * @author Rohit Lalchandani
 *************************************************************************/
var express = require('express'),
    app = express(), // Creates an express instance
    server = require('http').createServer(app), // Creates a web server
    pg = require('pg'), // PostgreSQL
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser');

/********************
 ** Authentication **
 ********************/
require('./config/passport-config')(passport);
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/routes.js')(app, passport);

/************************
 * Creates a web server *
 ************************/
server.listen(process.env.PORT || 3000); // Listening port for server

/* Serve static content */
app.use(express.static('public'));

/* Set Jade view engine */
app.set('view engine', 'jade');

// // Routing for webpages
// app.get('/', function(req, res) {
//   res.render('index');
// });
//
// app.get('/dashboard', function(req, res) {
//   res.render('dashboard');
// });
//
// // Database Setup
// app.get('/db', function (request, response) {
//   console.log(process.env.DATABASE_URL)
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { console.log(result); }
//     });
//   });
// })
