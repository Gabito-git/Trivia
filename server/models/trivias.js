const { Schema, model } = require('mongoose');

const TriviaSchema = new Schema({
    question:{
        type: String,
        required: true
    },
    answers:{
        type:[String],
        required: true
    },
    correctAnswer:{
        type: Number,
        required: true
    }
})

module.exports = model( 'Trivia', TriviaSchema );