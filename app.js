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
    config = require('./fb.js'),
    FacebookStrategy = require('passport-facebook').Strategy,
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser');

/********************
 ** Authentication **
 ********************/
passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(obj, done) {
 done(null, obj);
});
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
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());

//Router code
app.get('/', function(req, res){
  console.log("REQ.USER");
  console.log(req.user);
  res.render('login', { user: req.user });
});
app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

// Passport Router
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
       successRedirect : '/',
       failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

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
