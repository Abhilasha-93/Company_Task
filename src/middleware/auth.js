const jwt = require('jsonwebtoken')


const MidAuth = async function (req,res,next){
    try{
        let token = req.headers["x-api-key"];
        if(!token)token = req.headers["x-Api-key"];

        if(!token) return res.status(400).send({status:false, message:"token must be present in header"});

        try{let decodedToken = jwt.verify(token,"Secret"); 
       
        req.decodedToken=decodedToken;}
        catch(err){
            return res.status(401).send({status:false,data: err.message, message:"token is invalid"})
        }
        next() 
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}

module.exports.MidAuth  = MidAuth
