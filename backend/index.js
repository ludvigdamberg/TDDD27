const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const Routes = require('./routes/routes')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')


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


//Routes

app.use(Routes)

//Error functions
app.use(notFound)
app.use(errorHandler)



 