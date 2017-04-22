var express = require('express');
var router = express.Router();


router.use('/', function(request, response) {
    request.on('error', function() {
        return console.log('ERROR occured', error);
    });
    response.on('error', function() {
        return console.log('ERROR occured', error);
    });
    console.log('Request to auth routers');
});


router.get('/login', function(request, response) {
    request.on('error', function() {
        return console.log('ERROR occured', error);
    });
    response.on('error', function() {
        return console.log('ERROR occured', error);
    });
    console.log('Inside login router');
});


router.get('/signup', function(request, response) {
    request.on('error', function() {
        return console.log('ERROR occured', error);
    });
    response.on('error', function() {
        return console.log('ERROR occured', error);
    });
    console.log('Inside signup router');
});


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
