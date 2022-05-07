var jwt = require('jsonwebtoken');

let secret = `qrrr`

const createToken = (data) =>{
    return jwt.sign(data, secret)
}

const checkToken = (token) =>{
    return jwt.verify(token, secret)
}

module.exports = {createToken, checkToken}