const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const postModel = require('./models/UploadModel')
const uploadMiddleware = require('./middlewares/MulterMiddleware')
const multer = require('multer')

const app = express()

//Convert data correctly
app.use(express.json())
app.use(express.static("public"))
//Cors is used to connect to the database with react without issues
app.use(cors())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started, listening to port: ${PORT}`)
})

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)
 .then(() => {
    console.log("Connected to MongoDB")
 })
 .catch(err => console.log(err))



 app.post("/save", uploadMiddleware.single("photo"), (req,res) => {

    const photo = req.file.filename

    const post = new postModel({name:req.body.name,description: req.body.description, photo: photo})
    post.save()
    .then(console.log("Saved successfully"))

})


app.get('/posts', async (req,res) => {

    const posts = await postModel.find()
    res.send(posts) 
})
