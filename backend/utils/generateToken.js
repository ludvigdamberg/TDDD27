const jwt = require("jsonwebtoken")
require('dotenv').config()

const generateToken = (id) => {
    return jwt.sign({userId: id}, process.env.JWT_SECRET,{
        expiresIn: '10s',
    })
}

module.exports = generateToken