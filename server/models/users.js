const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },

    score:{
        type: String,
        required: true
    }
})

module.exports = model( 'User', UserSchema );