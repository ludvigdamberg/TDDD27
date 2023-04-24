const express = require('express')
const {Router} = require('express')
const userModel = require('../models/user')
const postModel = require('../models/UploadModel')
const uploadMiddleware = require('../middlewares/MulterMiddleware')
const multer = require('multer')
const generateToken = require('../utils/generateToken')
const asyncHandler = require('express-async-handler')
const router = Router()
const auth = require('../middlewares/auth')
const jwt = require('jsonwebtoken');

require('dotenv').config()



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

    const post = new postModel({name:req.body.name, recipe: req.body.recipe,description: req.body.description, photo: photo})
    post.save()
    .then(console.log("Saved successfully"))

})



//Get posts
router.get('/posts', async (req,res) => {

    const posts = await postModel.find()
    res.send(posts) 
})


//Register
router.post("/register", uploadMiddleware.single("photo"),asyncHandler(async (req,res) => {
    
    const email = req.body.email
    const username =  req.body.username
    const password =  req.body.password
    const photo = req.file.filename

    const userExists = await userModel.findOne({email})

    if(userExists){
        res.status(404)
        throw new Error("User Already exists")
    }

    const user = new userModel({email:req.body.email, username: req.body.username,password: req.body.password, photo: photo})

    if(user){
        res.json({
            _id: user._id,
            email:user.email,
            username:user.username,
            password:user.password,
            photo: user.photo
        })
        await user.save()
    }else{
      console.log("error occured!")
    }
}))

//fetch profile

router.get('/profile', (req, res) => {
    // Get the user's token from local storage
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    // Use jwt.verify to decode the token and get the user ID
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // If the token is invalid, send an error response
        return res.status(401).json({ message: 'Invalid token' });
      }
      console.log("hey")
      const userId = decoded.userId;
      console.log(userId)
      // If the token is valid, use the user ID to fetch the user data from the database
     
  
       userModel.findById(userId)
       .then(user => {
       console.log(user)
        res.send(user)
      })
      .catch(err => {
        console.log(err)
      });
    });
  });

module.exports = router