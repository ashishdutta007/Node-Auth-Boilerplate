//app.js - main business logic for the application
var express = require('express');

//Main instance of express server created here
//Export this instance to index.js
var app = express();

console.log('Inside app.js');

//Routing any request with /api to router logic
//app.use('/api', search_api);

//Exporting the same express insatnce to listen on port
module.exports.app = app;
