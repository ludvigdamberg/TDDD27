const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    profile_name: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
})

const commentModel = mongoose.model("comment", commentSchema)

module.exports = commentModel

