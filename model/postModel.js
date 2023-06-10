const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: String,
    email: String,
    destination: {
        type: String,
        enum: ["India", "Africa", "Europe", "America"]
    },
    travelers: Number,
    budget: Number
})

const postModel = mongoose.model('post', postSchema);

module.exports = { postModel }