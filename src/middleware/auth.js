const jwt = require('jsonwebtoken')


const MidAuth = async function(req, res, next){

    try {

        let bearerHeader = req.headers.authorization;
        if(typeof bearerHeader == "undefined") 
        return res.status(400).send({ status: false, message: "Token is missing" });
        
        let bearerToken = bearerHeader.split(' ');
       
        let token = bearerToken[1];

        let decodeToken = jwt.verify(token, 'secret')
    
        if (!decodeToken) 
        return res.status(401).send({ status: false, message: `Invalid Token` })
        
        req.userId = decodeToken.userId

        next()


    } catch (err) {

        res.status(500).send({ status: false, message: err.message })
    }
}


module.exports.MidAuth  = MidAuth
