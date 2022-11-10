const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const isValidPassword = function (password) {
//     let passwordregex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#@$%&? "])[a-zA-Z0-9!#@$%&?]{8,15}$/
//     return passwordregex.test(password)

// }
// //  One digit, one upper case , one lower case , its b/w 8 to 15
// const isValidEmail = function (email) {
//     let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//     return emailRegex.test(email)
// }
// // regex for email validation 

// const isValidName = function (name) {
//     let nameRegex = /^[a-zA-z]*$/
//     return nameRegex.test(name)
// }
exports.createUser = async function (req, res) {
    let data = req.body;

    if (!data) {
        return res.status(400).send({ status: false, message: "provide any data" })
    }
    let { name, email, password } = data
   
    //check name is present 
    if(!name ||typeof name !=='string' || name.trim().length==0 )
    {
        return res.status(400).send({ status: false, msg: "name is required and is of string type" })
    }

    //validate name
    if (!/^([a-zA-Z. , ]){1,100}$/.test(name)) {
        return res.status(400).send({ status: false, message: `name contain only alphabets` })
    }

     //check email is present
     if (!email ||typeof email !=='string' || email.trim().length==0) {
        return res.status(400).send({ status: false, message: "user's email  is required and of string type only" })
    }

    //check uniqueness of email
    if (await userModel.findOne({ email: email }))
        return res.status(400).send({ message: "Email already exist" })

    //validate email
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
        return res.status(400).send({ status: false, message: `Email should be a valid email address` });
    }

     //check password is present
     if (!password ||typeof password !=='string' || password.trim().length==0) {
        return res.status(400).send({ status: false, message: "user's password  is required and of string type only" })
    }
    
    //password validation
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(password)) {
        return res.status(400).send({ status: false, message: `password shoud be minimum 8 to maximum 15 characters which contain at least one numeric digit, one uppercase and one lowercase letter` })
    }  

    // validation
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(password, salt);
    data.password = hashPassword
    let createdUser = await userModel.create(data)
    return res.status(201).send({ status: true, message: "user data is created", data: createdUser})
}

exports.userLogin = async (req, res) => {

   
        let data = req.body;
        if (!data) {
            return res.status(400).send({ status: false, message: "provide any data" })
        }
        let { email, password } = data;

        const userData = await userModel.findOne({ email })

        let actualPassword = await bcrypt.compare(password, userData.password);

        if (!actualPassword) return res.status(401).send({ status: false, message: "Incorrect password" })

        var token = jwt.sign({
            userId: userData._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 24 *3600
        }, 'secret');
        
        res.setHeader("x-api-key", token);
        return res.status(201).send({ status: true, message : "login successful" ,data: token});   
}
