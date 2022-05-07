const { User, Book, Genre, BookGenre } = require('../models');
const { check } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/token');
// const user = require('../models/user');
class Controller {

    static async liatBookGenre(req, res) {
        try {
            const liatG = await BookGenre.findAll({
                include: [Book, Genre]
            })
            res.status(200).json({
                statusCode: 200,
                message: `liat book genre`,
                data: liatG,

            })
        }
        catch (err) {

            // console.log(err);
            let code = 500
            let message = `Internal Server Error`

            res.status(code).json({
                error: err,
                statusCode: code,
                message: message
            })

        }
    }

    static async getBooks(req, res) {
        try {
            const liatBook = await Book.findAll({})
            res.status(200).json({
                statusCode: 200,
                message: `liat book`,
                data: liatBook
            })
        }
        catch (err) {
            let code = 500
            let message = `Internal Server Error`

            res.status(code).json({
                error: err,
                statusCode: code,
                message: message
            })
        }
    }

    static async addBooks(req, res) {
        try {
            const { title, author, page } = req.body
            const addBook = await Book.create({
                title: title,
                author: author,
                page: page,
                InputerId: req.additionalData.id
            })
            res.status(201).json({
                statusCode: 201,
                message: `SUccess add data ${addBook.title}`
            })
        }
        catch (err) {
            let code = 500
            let message = `Internal Server Error`

            res.status(code).json({
               
                statusCode: code,
                message: message
            })
        }
    }

    static async editBooks(req, res) {
        try {
            const { title, author, page } = req.body
            const editBook = await Book.update(
                {
                    title: title,
                    author: author,
                    page: page,
                },
                {
                    where: {
                        id: +req.params.id
                    }
                }
            )
            // console.log(editBook);
            if(editBook == 0){
                throw new Error('NOT_FOUND')
            }
            res.status(200).json({
                statusCode: 200,
                message: `SUccess edit data`
            })
        }
        catch{
            let code = 500
            let message = `Internal Server Error`

            if(err.message == `NOT_FOUND`){
                code = 404
                message = `Data is not found`
            }
            res.status(code).json({
              
                statusCode: code,
                message: message
            })
        }
    }
    static async deleteBook(req,res){
        try{
            const deleteBook = await Book.destroy({
                where:{
                    id: +req.params.id
                }
            })
            // console.log(deleteBook);
            if(deleteBook == 0){
                throw new Error('NOT_FOUND')
            }
            res.status(200).json({
                statusCode: 200,
                message: `SUccess delete data`
            })
        }
        catch(err){
            let code = 500
            let message = `Internal Server Error`

            if(err.message == `NOT_FOUND`){
                code = 404
                message = `Data is not found`
            }
            res.status(code).json({
               
                statusCode: code,
                message: message
            }) 
        }
    }

    static async readGenre(req,res){
        try{
            const liatGenre = await Genre.findAll({})
            res.status(200).json({
                statusCode: 200,
                message: `liat`,
                data: liatGenre
    
            })

        }
    catch (err) {
        console.log(err);
        let code = 500
        let message = `Internal Server Error`

        res.status(code).json({
          
            statusCode: code,
            message: message
        })
    }

    }

    static async createGenre(req,res){
        const {name} = req.body
        try{
            const bikinGenre = await Genre.create({
                name: name,
                InputerId: req.additionalData.id
            }) 
           
            res.status(201).json({
                statusCode: 201,
                message: `Success add Genre ${bikinGenre.name}`
            })
        }
        catch(err){
            console.log(err);
            let code = 500
            let message = `Internal Server Error`
    
            res.status(code).json({
            
                statusCode: code,
                message: message
            })
        }
        
    }

    static async editGenre(req,res){
        const {name} = req.body
        try{
            const gantiGenre = await Genre.update({
                name:name
            },{
                where:{
                    id: req.params.id
                }
            })
            if(gantiGenre == 0){
                throw new Error('NOT_FOUND')
            }
            res.status(200).json({
                statusCode: 200,
                message: `SUccess edit Genre`
            })
        }
        catch(err){
            let code = 500
            let message = `Internal Server Error`

            if(err.message == `NOT_FOUND`){
                code = 404
                message = `Data is not found`
            }
            res.status(code).json({
                statusCode: code,
                message: message
            }) 
            
        }
    }

    static async deleteGenre(req,res){
        try{
            let deletedGenre = await Genre.destroy({
                where:{
                    id: +req.params.id
                }
            })
            if(deletedGenre == 0){
                throw new Error('NOT_FOUND')
            }
            res.status(200).json({
                statusCode: 200,
                message: `SUccess delete Genre`
            })
        }
        catch(err){
            console.log(err);
            let code = 500
            let message = `Internal Server Error`
    
            if(err.message == `NOT_FOUND`){
                code = 404
                message = `Data is not found`
            }
            res.status(code).json({
                statusCode: code,
                message: message
            }) 
        }
    }

    static async liatUser(req, res) {
        try {
            const liat = await User.findAll({})
            res.status(200).json({
                statusCode: 200,
                message: `liat`,
                data: liat,

            })
        }
        catch (err) {
            console.log(err);
            let code = 500
            let message = `Internal Server Error`

            res.status(code).json({
                error: err,
                statusCode: code,
                message: message
            })
        }
    }

    static async register(req, res) {
        try {
            const { email, password, role } = req.body
            const info = await User.create({
                email: email,
                password: password,
                role: role
            })
            res.status(201).json({
                statusCode: 201,
                message: `Success Add Data`,
                data: info.email
            })
        }
        catch (err) {
            console.log(err);
            let code = 500
            let message = `Internal Server Error`

            res.status(code).json({
                error: err,
                statusCode: code,
                message: message
            })
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            //bikin if else kalo email / password gaada (sendiri2)
            let searchEmail = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!searchEmail) {
                throw new Error(`User_Not_Found`)
            }
            let checkPw = check(password, searchEmail.password)
            if (!checkPw) {
                throw new Error(`Password_ngawur`)
            }
            const payload = {
                id: searchEmail.id,
                email: searchEmail.email,
                role: searchEmail.role
            }

            const token = createToken(payload)
            res.status(200).json({
                statusCode: 201,
                message: `Silahkan masuk`,
                token: token
                // data: info.email
            })
        }
        catch (err) {
            // console.log(err);
            let code = 500
            let message = `Internal Server Error`

            if (err.message == `User_Not_Found`) {
                code = 404
                message = `USer is Not Found`
            }
            if (err.message == `Password_ngawur`) {
                code = 401
                message = `Password_ngawur`
            }
            res.status(code).json({
                error: err,
                statusCode: code,
                message: message
            })
        }
    }



}
module.exports = Controller