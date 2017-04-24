//app.js - main business logic for the application
//bootstrap our entire application
//can call it as a controller file for the node app

console.log('Inside app.js');

var express = require('express');
//Main instance of express server created here
//Export this instance to index.js
var app = express();

//var authRoutes = require('./api-routes/routes.js');

var configDb = require('../config/database.js');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

//required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//Connect to database
mongoose.connect(configDb.url, function(error) {
    if (error) {
        return console.log('Error in connection ', error);
    } else {
        console.log('Connection made successfully to ', configDb.url);
    }
});

//automated logging of requests, responses and related data
app.use(morgan('dev'));
//configure express app settings table
//set views dir path 
app.set('views', './views');
//set templating engine
app.set('view engine', 'ejs');

//app.use -- mounting a middleware with acc to routes(here middleware is router obj - light middleware)
//Routing any request with /api to router logic


require('../config/passport.js')(passport);

console.log(passport);

var authRoutes = require('./api-routes/routes.js')(passport);

app.use('/auth', authRoutes);

//Exporting the same express insatnce to listen on port
module.exports = {
    app: app,
    passport: passport,
    mongoose: mongoose
};
