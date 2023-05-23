const express = require('express')
const { Router } = require('express')
const userModel = require('../models/user')
const postModel = require('../models/post')
const uploadMiddleware = require('../middlewares/MulterMiddleware')
const multer = require('multer')
const generateToken = require('../utils/generateToken')
const asyncHandler = require('express-async-handler')
const router = Router()
const auth = require('../middlewares/auth')
const jwt = require('jsonwebtoken');
const fs = require('fs')
const commentModel = require('../models/comment')


require('dotenv').config()



//Log in
router.post('/login', async (req, res) => {

  const { email, password } = req.body

  const user = await userModel.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      username: user.username,
      password: user.password,
      token: generateToken(user._id)
    })
    console.log("Successfully logged in")

  }
  else {
    console.log("wrong Credentials")
  }
})

//Register
router.post("/register", uploadMiddleware.single("photo"), asyncHandler(async (req, res) => {

  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const photo = req.file.filename


  const userExists = await userModel.findOne({ email })

  if (userExists) {
    res.status(404)
    throw new Error("User Already exists")
  }

  const user = new userModel({ email: req.body.email, username: req.body.username, password: req.body.password, photo: photo })

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      username: user.username,
      password: user.password,
      photo: user.photo
    })
    await user.save()
  } else {
    console.log("error occured!")
  }
}))

//Create post
router.post("/post", uploadMiddleware.single("photo"), (req, res) => {

  const photo = req.file.filename



  const post = new postModel(
    {
      name: req.body.name,
      recipe: req.body.recipe,
      description: req.body.description,
      author: req.body.author,
      profile_picture: req.body.profilePicture,
      profile_name: req.body.profileName,

      photo: photo
    })
  post.save()
    .then(console.log("Saved successfully"))

})


//Get posts
router.get('/posts', async (req, res) => {

  const loads = req.headers.loads

  console.log(loads)

  if (req.headers.search.length == 0) {
    const posts = await postModel.find().limit(loads * 2).exec()
    return res.send(posts)

  } else if (req.headers.search.length > 0) {

    const search = req.headers.search; // Get the search query from the request query parameters

    console.log(search)
    const posts = await postModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { recipe: { $regex: search, $options: "i" } }
        // add as many components as needed
      ],
    }).limit(loads * 2).exec()

    return res.send(posts)

  }



})
router.get('/search', async (req, res) => {


  const search = req.headers.search; // Get the search query from the request query parameters

  console.log(search)
  const posts = await postModel.find({
    $or: [
      { name: { $regex: searchString, $options: "i" } },
      { recipe: { $regex: searchString, $options: "i" } }
      // add as many components as needed
    ],
  })

  return res.send(posts)


})


//get profile posts
router.get('/profilePosts', async (req, res) => {

  const userId = req.headers.author

  postModel.find({ author: userId })
    .populate('author')
    .exec()
    .then(posts => {
      res.json(posts)

    })
})

//fetch profile
router.get('/profile', (req, res) => {
  // Get the user's token from local storage
  const token = req.headers.authorization.split(' ')[1];
  // Use jwt.verify to decode the token and get the user ID
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If the token is invalid, send an error response
      return res.status(401).json({ message: 'Invalid token' });
    }
    const userId = decoded.userId;
    // If the token is valid, use the user ID to fetch the user data from the database


    userModel.findById(userId)
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        console.log(err)
      });
  });
});

router.post('/deletePost', async (req, res) => {


  const deletedPost = await postModel.findByIdAndDelete(req.body.id)

  if (!deletedPost) {
    return res("Post not found")
  } else {
    res.json("Post deleted successfully")
    fs.unlinkSync(`./public/uploads/${req.body.image}`)
  }



})


// adding user id to upvote list
router.put('/upvote', async (req, res) => {

  console.log(req.body)

  const post = await postModel.findById(req.body.post_id)

  console.log(post)

  if (!post) {
    return res.json("Not a valid post")
  }

  if (post.upvotes.includes(req.body.upvote)) {


    const index = post.upvotes.indexOf(req.body.upvote)
    post.upvotes.splice(index, 1)
    await post.save()
    return res.json("upvote deleted")
  } else {
    post.upvotes.push(req.body.upvote)
    await post.save()
    res.send(post)
  }



})

router.get("/api/posts/search", (req, res) => {
  const search = req.headers.search; // Get the search query from the request query parameters
  postModel.find({ $text: { $search: search } }, (err, posts) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
    return res.json(posts); // Send the matching posts back to the frontend
  });
});

router.post("/comment", (req, res) => {

  console.log(req.body)

  const comment = new commentModel(
    {
      profile_name: req.body.profile_name,
      profile_picture: req.body.profile_picture,
      comment: req.body.comment,
    })
  comment.save()
    .then(console.log("comment saved successfully"))
  res.json(comment)

})

router.put('/savecomment', async (req, res) => {

  console.log(req.body)

  const post = await postModel.findById(req.body.post_id)

  console.log(post)

  if (!post) {
    return res.json("Not a valid post")
  } else {

    const comment = req.body.comment_id

    console.log(comment)

    post.comments.push(comment)

    await post.save()

    res.send("Success")
  }
})


router.get('/getcomments', async (req, res) => {


  const postId =   req.headers.postid

  const post = await postModel.findById(postId);

  if (!post) {
    return res.send("Somethings up bud!");
  }

  const commentIds = post.comments

  console.log(commentIds)

  const comments = []

  for (const commentId of commentIds) {
    const comment = await commentModel.findById(commentId);
    if (comment) {
      comments.push(comment);
    }
  }

  res.send(comments)
})




module.exports = router