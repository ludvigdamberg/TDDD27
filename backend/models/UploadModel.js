const mongoose = require('mongoose')
const userModel = require('./user')

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    recipe: {
        type: [String],
        required: false
    },
    description: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    profile_picture: {
        type: String,
        required: true
    },
    profile_name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }


})

const postModel = mongoose.model("Post", postSchema)

module.exports = postModel

