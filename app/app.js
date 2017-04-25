//app.js - Bootstrap/Control our entire application
console.log('Inside app.js');

var express = require('express');
//Main express instance for the app created here
//Export this instance to server.js
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
//Load Db config file
var configDb = require('../config/database.js');

//Utility modules 
var morgan = require('morgan'); //Log incoming requests
var bodyParser = require('body-parser'); // Parse request bodies
var session = require('express-session'); //Sessions
var flash = require('connect-flash'); //Flash messages
//var cookieParser = require('cookie-parser'); //Parse cookies

//Mounting recording/logging specific middleware on all request route paths
app.use(morgan('dev')); //Automated logging of requests, responses and related data
app.use(bodyParser.urlencoded({ extended: false })); // Get information from html forms
//app.use(cookieParser()); // Read cookies (needed for auth)

//Mounting passport specific middleware on all request route paths
//----????-----
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//Configure express application settings table
app.set('views', './views'); //Set views dir path 
app.set('view engine', 'ejs'); //Set templating engine

//Connect to database
mongoose.connect(configDb.url, function(error) {
    if (error) {
        return console.log('Error in connection ', error);
    } else {
        console.log('Connection made successfully to ', configDb.url);
    }
});



require('../config/passport.js')(passport);

//console.log(passport);

var authRoutes = require('./api-routes/routes.js')(passport);
app.use('/auth', authRoutes);

//Exporting the same express insatnce to listen on port
module.exports = {
    app: app,
    mongoose: mongoose
};
