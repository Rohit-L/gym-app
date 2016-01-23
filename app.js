/*************************************************************************
 * GymRec - Workout Logger
 *************************************************************************
 * @description Server logic
 * @author Rohit Lalchandani
 *************************************************************************/

/************************
 * Creates a web server *
 ************************/
var express = require('express'), // Creates an express instance
    app = express(),
    server = require('http').createServer(app), // Creates a web server
    io = require('socket.io').listen(server); // Creates a socket.io instance
    pg = require('pg'); // PostgreSQL
    passport = require('passport');
    config = require('./fb.js');
    FacebookStrategy = require('passport-facebook').Strategy;
    cookieParser = require('cookie-parser')
    session = require('express-session')


// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// config
passport.use(new FacebookStrategy({
  clientID: config.appID,
  clientSecret: config.appSecret,
  callbackURL: config.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));




server.listen(process.env.PORT || 3000); // Listening port for server
console.log("Listening at localhost");

/* Serve static content */
app.use(express.static('public'));

/* Set Jade view engine */
app.set('view engine', 'jade');

// Configure App
app.use(cookieParser());
app.use(session({ secret: 'berkeleyEECS' }));
app.use(passport.initialize());
app.use(passport.session());

// Routing for webpages
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

// Database Setup
app.get('/db', function (request, response) {
  console.log(process.env.DATABASE_URL)
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { console.log(result); }
    });
  });
})
