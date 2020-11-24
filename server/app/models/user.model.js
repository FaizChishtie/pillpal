const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    middleName: String,
    number: String,
    age: Number,
});

module.exports = mongoose.model('User', UserSchema);