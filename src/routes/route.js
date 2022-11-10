const express = require('express');
const router = express.Router();
const studentController = require("../controller/studentController")  
const userController = require("../controller/userController")

const mid= require("../middleware/auth")

//User APIs
//router.post("/register", userController.createUser)//create user
router.post('/register', function(req, res){userController.createUser});
// router.post("/login", userController.loginUser)//login user

// //student APIs
// router.post("/student",mid.MidAuth,studentController.createStudent) //add 
// router.get("/studentView",mid.MidAuth,studentController.getStudent) //view
// router.put("/studentEdit",mid.MidAuth,studentController.updateStudentData) //edit
// router.delete("/studentDelete",mid.MidAuth,studentController.deleteStudentData) //delete


// router.all("/****", function (req, res) {
//     res.status(400).send({
//         status: false,
//         message: "Your Endpoint is Not Correct."
//     })
// })

module.exports = router