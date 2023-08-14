const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : String,
    email :{
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    confirmPassword : {
        type: String,
    },
    gender : String,
    address:{
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('_user', userSchema);

module.exports = {UserModel}