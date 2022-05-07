const { User, Book, Genre, BookGenre } = require('../models');
const authorization = async(req, res, next) => {
    try {
        let iduser = req.additionalData.id
        let roleuser = req.additionalData.role
        let productId = req.params.id
        // console.log(iduser,roleuser);
        let checkProduk = await Book.findByPk(+productId)

        if(!checkProduk){
            throw new Error(`NOT_FOUND`)
        }
        // console.log(iduser);
        // console.log(checkProduk);
        if (roleuser == `admin`) {
            next() 
            // console.log(`masuk 1`);
        } else if(iduser == checkProduk.InputerId){
            next()
            // console.log(`masuk 2`);
        } else{
            throw new Error(`NO_PERMISSION`) // Forbidden 403
        }
    }
    catch (err) {
        let code = 500
        let message = `Internal Server Error`

        if(err.message == `NOT_FOUND`){
            code = 404
            message = `Data is not found`
        }
        if(err.message == `NO_PERMISSION` ){
            code = 401
            message = `No Permission`
        }
        res.status(code).json({
          
            statusCode: code,
            message: message
        })
    }
}

module.exports = { authorization }