const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    recipe:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:true
    },
    photo:{
        type: String,
        required: false
    }

  
})

const postModel = mongoose.model("Post",postSchema)

module.exports = postModel

