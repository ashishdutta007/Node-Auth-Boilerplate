var express = require('express');
//Create express router object
var router = express.Router();

//Logging route for all requests
router.use('/', function(request, response, next) {
    request.on('error', function() {
        return console.log('ERROR occured', error);
    });
    response.on('error', function() {
        return console.log('ERROR occured', error);
    });
    console.log('Request to auth routers');
    response.render('./index');
});

//Login route
router.get('/login', function(request, response) {
    request.on('error', function() {
        return console.log('ERROR occured', error);
    });
    response.on('error', function() {
        return console.log('ERROR occured', error);
    });
    response.render('./index');
    console.log('Inside login router');
});

//Signup route
router.get('/signup', function(request, response) {
    request.on('error', function() {
        return console.log('ERROR occured', error);
    });
    response.on('error', function() {
        return console.log('ERROR occured', error);
    });
    console.log('Inside signup router');
});

//Profile view route
router.get('/profile', function(request, response) {
    request.on('error', function() {
        return console.log('ERROR occured', error);
    });
    response.on('error', function() {
        return console.log('ERROR occured', error);
    });
    console.log('Inside profile router');
});


module.exports = router;
