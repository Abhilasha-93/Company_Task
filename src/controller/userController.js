const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const isValidPassword = function (password) {
    let passwordregex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#@$%&? "])[a-zA-Z0-9!#@$%&?]{8,15}$/
    return passwordregex.test(password)

}
//  One digit, one upper case , one lower case , its b/w 8 to 15
const isValidEmail = function (email) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
}
// regex for email validation 

const isValidName = function (name) {
    let nameRegex = /^[a-zA-z]*$/
    return nameRegex.test(name)
}
exports.createUser = async function (req, res) {
    let data = req.body;

    if (!data) {
        return res.status(400).send({ status: false, message: "provide any data" })
    }
    let { name, email, password } = data
    // validation
    data.password = await bcrypt.hash(password, 10);

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

        const token = jwt.sign({
            userId: userData._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 24 *3600
        }, 'secret')

        return res.status(200).send({ status: true, message: "login successful",token:token })
    
}
