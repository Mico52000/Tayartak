const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({


    FirstName:
    {
        type: String
    },

    LastName: {

        type: String
    },
    Email: {

        type: String
    },
    Username: {

        type: String
    },
    Password: {

        type: String
    },
    Address: {

        type: String
    },
    PhoneNumber: {

        type: String
    },
    Passport: {

        type: String
    },
    Type:{
        type: String
    },


});


const UsersModel = mongoose.model('users', UsersSchema)
module.exports = UsersModel;