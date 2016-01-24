/*************************************************************************
 * GymRec - Workout Logger
 *************************************************************************
 * @description Describes application routes
 * @author Rohit Lalchandani, Pranay Kumar, Sophia Zheng, Anish Balaji
 *************************************************************************/
module.exports = function(app, passport, pg) {

  /*****************
   ** Main Routes **
   *****************/

  // Root Directory
  app.get('/', function(req, res) {
      res.render('index');
  });

  // Main Dashboard
  app.get('/dashboard', isLoggedIn, function(req, res) {
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

  /********************
   ** Authentication **
   ********************/

  // Facebook Login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/dashboard',
    failureRedirect : '/'
  }));

  // Session Logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/'); // Redirect to root directory
  });

};

// Middleware -- Confirms Authenticated
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
