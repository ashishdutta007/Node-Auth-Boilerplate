var express = require('express');
//Create express router object
var router = express.Router();

module.exports = function(passportConfig) {

    //Homepage
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
    router.get('/login', function(request, response) {
        request.on('error', function() {
            return console.log('ERROR occured', error);
        });
        response.on('error', function() {
            return console.log('ERROR occured', error);
        });
        // render the page and pass in any flash data if it exists
        // flash data ????
        response.render('./login', { message: request.flash('loginFlashMessage') });
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
        //Params -- [page/template ,data]
        //Render the html using template and data 
        response.render('signup', { message: request.flash('Signup Message') });
        console.log('Inside signup router');
    });

    //Signup POST route
    router.post('/signup', passportConfig.authenticate('local-signup', {
        successRedirect: '/auth/login', // redirect to the secure profile section
        failureRedirect: '/auth/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }), function(request, response) {
        console.log("Request.body :", request.body.email);
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
