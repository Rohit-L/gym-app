module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index');
    });

    // // =====================================
    // // LOGIN ===============================
    // // =====================================
    // // show the login form
    // app.get('/login', function(req, res) {
    //
    //     // render the page and pass in any flash data if it exists
    //     res.render('login', { message: req.flash('loginMessage') });
    // });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/dashboard',
        failureRedirect : '/'
    }));

    // process the login form
    // app.post('/login', do all our passport stuff here);



    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/dashboard', isLoggedIn, function(req, res) {
      res.render('dashboard');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("ISLOGGEDIN");
    console.log(req.session);
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
