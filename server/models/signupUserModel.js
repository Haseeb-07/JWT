// signupUserModel.js
const mongoose = require('mongoose');

const signupUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Other user-related fields
});

const SignupUser = mongoose.model('SignupUser', signupUserSchema);

module.exports = SignupUser;
