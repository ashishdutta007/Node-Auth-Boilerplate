//app.js - main business logic for the application
//can call it as a controller file for the node app
var express = require('express');
var authRoutes = require('./api-routes/routes.js');

//Main instance of express server created here
//Export this instance to index.js
var app = express();

console.log('Inside app.js');

//configure express app settings table
//set views dir path 
app.set('views', './views');
//set templating engine
app.set('view engine','ejs');

//Routing any request with /api to router logic
app.use('/auth', authRoutes);

//Exporting the same express insatnce to listen on port
module.exports.app = app;
