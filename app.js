/*************************************************************************
 * GymRec - Workout Logger
 *************************************************************************
 * @description Server Logic
 * @author Rohit Lalchandani, Pranay Kumar, Sophia Zheng, Anish Balaji
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

/***************************
 ** Authentication Config **
 ***************************/
require('./config/passport-config')(passport);
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());

/******************
 ** Setup Routes **
 ******************/
require('./config/routes.js')(app, passport, pg);

/************************
 * Creates a web server *
 ************************/
server.listen(process.env.PORT || 3000); // Listening port for server
/* Serve static content */
app.use(express.static('public'));
/* Set Jade view engine */
app.set('view engine', 'jade');
