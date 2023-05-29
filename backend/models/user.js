const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

email:{
    type: String,
    required: true
},
username:{
    type:String,
    required: true
},
password:{
    type:String,
    required: true
},
posts: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "post",
    required: false
},
photo:{
    type: String,
    required: false
}
},{
    timestamps: true,
})


userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

const userModel = new mongoose.model('user',userSchema)

module.exports = userModel