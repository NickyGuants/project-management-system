const jwt= require('jsonwebtoken')
require('dotenv').config()
const generateToken = (email, username, name) => {
    return jwt.sign({ email, username, name }, process.env.SECRET_KEY, { expiresIn: '1800s' })
}
module.exports = generateToken;