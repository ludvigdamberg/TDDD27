const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const Routes = require('./routes/routes')
const checkUserExists = require('./middlewares/MulterMiddleware')



const app = express()

app.use(express.json())
app.use(express.static("public"))
app.use(cors())
app.use(Routes)


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






 