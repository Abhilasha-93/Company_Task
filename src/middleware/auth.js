const jwt = require('jsonwebtoken')


const MidAuth = async function (req,res,next){
    // try{
    //     let token = req.headers["x-api-key"];
    //     if(!token)token = req.headers["x-Api-key"];

    //     if(!token) return res.status(400).send({status:false, message:"token must be present in header"});

    //     let decodedToken = jwt.verify(token,"Secret"); 
       
    //     req.decodedToken=decodedToken;
    //     if(token.userId !== decodedToken.userId)
    //     return res.status(401).send({status:false, message:"unauthorized access"});
        
    //     next() 
    // }
    // catch(err){
    //     return res.status(500).send({status:false, message:err.message})
    // }
    // {
        try {
            let token = (req.headers["x-api-key"])
    
            if (!token) {
                return res.status(400).send({ status: false, msg: "Token must be present", });
            }
    
            let decodedToken = jwt.verify(token, "secret")      // decoding token 
           
             
            if (!decodedToken) {
                return res.status(400).send({ status: false, msg: "Token is invalid" });
            }
            next()
        }
    catch (err) {
            return res.status(500).send({ msg: "Error", error: err.message })
        }
    
    }

module.exports.MidAuth  = MidAuth
