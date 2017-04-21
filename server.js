//Importing express server instance from app.js
var app = require('./app/app.js').app;
var port = process.env.PORT || 3000;

console.log('Inside server.js');

//Server listening on port
app.listen(port, function(error) {
    if (error) {
        return console.log("An error occurred", error);
    } else {
        return console.log('Server listening on port ' + port);
    }
});

