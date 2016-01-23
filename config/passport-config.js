var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./fb.js');


// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
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
    }));
};
