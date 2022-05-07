const {checkToken} = require(`../helpers/token`)
const {User} = require('../models')

const authentication = (req,res,next) =>{
    try{
        const {access_token} = req.headers
        // console.log(access_token);
        let payload = checkToken(access_token)
        // console.log(payload);
        let checkId = User.findOne({
            where:{
                id: payload.id
            }
        })
        if(!checkId){
            console.log(`user_not_found`);
        }
        req.additionalData = {
            id: payload.id,
            email: payload.email,
            role: payload.role
        }
        next()
    }
    catch(err){
        //401 unauthorized
    }
}

module.exports = {authentication}