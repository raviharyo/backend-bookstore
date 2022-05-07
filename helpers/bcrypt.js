var bcrypt = require('bcryptjs');

const hashing = (password) =>{
    return bcrypt.hashSync(password, 8)
}

const check = (password, hash) =>{
    return bcrypt.compareSync(password, hash);
}

module.exports = {hashing, check}