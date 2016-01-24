/*************************************************************************
 * GymRec - Workout Logger
 *************************************************************************
 * @description Passport Logic in order to allow for login authentication
 * @author Rohit Lalchandani, Pranay Kumar, Sophia Zheng, Anish Balaji
 *************************************************************************/
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./fb.js');

module.exports = function(passport) {

    /*********************************
     ** Passport Setup For Facebook **
     *********************************/
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });
    passport.use(new FacebookStrategy({
        clientID        : config.appID,
        clientSecret    : config.appSecret,
        callbackURL     : config.callbackURL
      },
      // facebook will send back the token and profile
      function(token, refreshToken, profile, done) {
        process.nextTick(function() {
          return done(null, profile);
        });
      }
    ));
};
