const {Router} = require('express')
const bcrypt = require("bcrypt")
const userModel = require('../models/user')
const postModel = require('../models/UploadModel')
const uploadMiddleware = require('../middlewares/MulterMiddleware')
const multer = require('multer')
const generateToken = require('../utils/generateToken')
const asyncHandler = require('express-async-handler')
const router = Router()



//Log in
router.post('/login',async (req,res) => {
  
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            email:user.email,
            username:user.username,
            password:user.password,
            token: generateToken(user._id)
        })
        console.log("Successfully logged in")
    }
    else{
       console.log("wrong Credentials")
    }
})



//Create post
router.post("/post", uploadMiddleware.single("photo"), (req,res) => {

    const photo = req.file.filename

    const post = new postModel({name:req.body.name,description: req.body.description, photo: photo})
    post.save()
    .then(console.log("Saved successfully"))

})



//Get posts
router.get('/posts', async (req,res) => {

    const posts = await postModel.find()
    res.send(posts) 
})


//Register
router.post("/register", asyncHandler(async (req,res) => {
    
   const {email,username,password} = req.body

    const userExists = await userModel.findOne({email})

    if(userExists){
        res.status(404)
        throw new Error("User Already exists")
    }

    const user =  new userModel({
        email,
        username,
        password
    })

    if(user){
        res.json({
            _id: user._id,
            email:user.email,
            username:user.username,
            password:user.password,
            token: generateToken(user._id)
        })
        await user.save()
    }else{
      console.log("error occured!")
    }
}))

module.exports = router