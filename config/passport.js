//Passport config file
console.log('Inside passport.js');

//var passport = require('passport-local');
//var passport = require('../app/app.js').passport;
var localStrategy = require('passport-local').Strategy;
var user = require('../app/models/user.js');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        user.findById(id, function(err, user) {
            done(err, user);
        });
    });


    //Defining/configuring strategies 

    //The Local Strategy allows us to authenticate users by looking up their data in the app's database
    //[args- strategy name , strategy {options{},verifyCallback}]
    passport.use('local-signup', new localStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function(request, email, password, done) {

        // asynchronous
        // callback will be executed in the next iteration of event loop
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            user.findOne({ 'email': email }, function(err, usr) {
                // if there are any errors, return the error
                if (err) {
                    console.log('An error occured ', err);
                    return done(err);
                }
                // check to see if theres already a user with that email
                if (usr) {
                    return done(null, false, request.flash('signupMessage', 'That email is already taken.'));
                } else {
                    console.log('New User here!!!!');
                    // if there is no user with that email
                    // create the user
                    var newUser = new user({ 'local.email': email, 'local.password': password });

                    console.log(newUser.local.email)
                        // set the user's local credentials
                        //newUser.local.email = email;
                        //newUser.local.password = newUser.generateHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err) {
                            console.log('An error occurred ', err);
                        } else {
                            return done(null, newUser);
                        }
                    });
                }

            });

        });
    }));

};
