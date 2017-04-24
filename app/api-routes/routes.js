var express = require('express');
//Create express router object
var router = express.Router();
//var app = require('../app.js');
var passport = require('../../config/passport.js');

//For authenticate() get the passport object from config/passport.js(app.js-->passport.js-->routes.js)

//module.exports = router;
module.exports = function(passportConfig) {
    //Logging route for all requests
    //homepage
    router.get('/index', function(request, response, next) {
        request.on('error', function() {
            return console.log('ERROR occured', error);
        });
        response.on('error', function() {
            return console.log('ERROR occured', error);
        });
        console.log('Request to auth routers');
        response.render('./index');
    });

    //Login page route
    //Show login 
    router.get('/login', function(request, response) {
        request.on('error', function() {
            return console.log('ERROR occured', error);
        });
        response.on('error', function() {
            return console.log('ERROR occured', error);
        });
        // render the page and pass in any flash data if it exists
        // flash data ????
        //response.render('./login', { message: request.flash('loginFlashMessage')}); 
        response.render('./login', { message: 'loginFlashMessage' });
        console.log('Inside login router');
    });

    //Signup page route
    router.get('/signup', function(request, response) {
        request.on('error', function() {
            return console.log('ERROR occured', error);
        });
        response.on('error', function() {
            return console.log('ERROR occured', error);
        });
        //params -- page/template to be rendered & the data 
        response.render('signup', { message: 'signup message' });
        console.log('Inside signup router');
    });


    router.post('/signup', passportConfig.authenticate('local-signup', {
        successRedirect: '/auth/login', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }), function(request, response) {
    		console.log('Inside post signup router');


        request.on('error', function() {
            return console.log('ERROR occured', error);
        });
        response.on('error', function() {
            return console.log('ERROR occured', error);
        });


        console.log('Inside signup post router');
    });


    //Profile view route
    router.get('/profile', isLoggedIn, function(request, response) {
        request.on('error', function() {
            return console.log('ERROR occured', error);
        });
        response.on('error', function() {
            return console.log('ERROR occured', error);
        });
        //Get the user out of session and pass to template
        res.render('profile.ejs', { user: request.user });
        console.log('Inside profile router');
    });

    router.get('/logout', function(request, response) {
        request.logout();
        response.redirect('/index');
    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(request, response, next) {

        // if user is authenticated in the session, carry on 
        if (request.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        response.redirect('/index');
    }

    return router;

};
