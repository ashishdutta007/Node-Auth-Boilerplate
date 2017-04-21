//app/models/user.js
//User model to store user information

console.log('Inside user.js');

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//Dont have to create a connection to create a Schema
//Define schema for user model
var userSchema = new mongoose.Schema({
    local: {
        email: { type: String, reuired: true },
        password: { type: String, required: true }
    },
    facebook: {
        id: { type: String },
        token: { type: String },
        email: { type: String },
        name: { type: String }
    },
    twitter: {
        id: { type: String },
        token: { type: String },
        displayName: { type: String },
        username: { type: String }
    },
    google: {
        id: { type: String },
        token: { type: String },
        email: { type: String },
        name: { type: String }
    }
});


//Instance methods of userSchema

//Genearte hash value of the password with appended salt value
userSchema.methods.generateHash = function(password) {
    //Generate salt (random string to append to password)
    var salt = genSaltSync(10);
    return bcrypt.hashSync(password, salt, null);
};

//Checking if user entered password is valid
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//Create model for userSchema
var userModel = mongoose.model('User', userSchema);

//Export userModel to app
module.exports = userModel;
