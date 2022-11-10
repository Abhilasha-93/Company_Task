const studentModel = require('../model/studentModel')

//add
exports.createStudent = async function (req, res) {
    let data = req.body;
    let { name, subject, marks } = data;
    
    //check data is exist | key exist in data
    if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, msg: "Data is required to add a student" })
    }

    //check name is present 
    if(!name ||typeof name !=='string' || name.trim().length==0 )
    {
        return res.status(400).send({ status: false, msg: "name is required and is of string type" })
    }

    //validate name
    if (!/^([a-zA-Z. , ]){1,100}$/.test(name)) {
        return res.status(400).send({ status: false, message: `name contain only alphabets` })
    }
    
    //check subject is present 
    if(!subject ||typeof subject !=='string' || subject.trim().length==0 )
    {
        return res.status(400).send({ status: false, msg: "subject is required and is of string type" })
    }

    //validate subject
    if (!/^([a-zA-Z. , ]){1,100}$/.test(name)) {
        return res.status(400).send({ status: false, message: `subject contain only alphabets` })
    }
   
    //check marks is present 
    if(!marks ||typeof marks !=='number' || marks.trim().length==0 )
    {
        return res.status(400).send({ status: false, msg: "marks required and is of number type" })
    }

    //validate marks
    if (!/^\d{3}$/.test(marks)) {
        return res.status(400).send({ status: false, message: "marks contain only number" })
    }

    let filter = { name, subject }
    let update = { marks }

    let studentData = await studentModel.find({ name: name, subject: subject });

    if (!studentData) {

        let createStudentData = await studentModel.create(data);
        return res.status(201).send({ message: "student data created", data: createStudentData })

    } else {

        let updatedStudentData = await studentModel.findOneAndUpdate(filter, update, { new: true, upsert: true })
        return res.status(200).send({ message: "student data updated", data: updatedStudentData })

    }

}

//view
exports.getStudent = async function (req, res) {
    let data = req.query
    //validation
    if(!data) 
    return res.status(400).send({ message: "enter name and subject"})

    let { name, subject } = data
    // validation
     //check name is present 
     if(!name ||typeof name !=='string' || name.trim().length==0 )
     {
         return res.status(400).send({ status: false, msg: "name is required and is of string type" })
     }
 
     //validate name
     if (!/^([a-zA-Z. , ]){1,100}$/.test(name)) {
         return res.status(400).send({ status: false, message: `name contain only alphabets` })
     }
     
     //check subject is present 
     if(!subject ||typeof subject !=='string' || subject.trim().length==0 )
     {
         return res.status(400).send({ status: false, msg: "subject is required and is of string type" })
     }
 
     //validate subject
     if (!/^([a-zA-Z. , ]){1,100}$/.test(name)) {
         return res.status(400).send({ status: false, message: `subject contain only alphabets` })
     }
    let studentData = await studentModel.find({ data });
    if (!studentData) {
        return res.status(404).send({ message: "student data not found" })
    }

    return res.status(200).send({ message: "student data", data: studentData })

}

// edit

exports.updateStudentData = async function (req, res) {
    
    let data = req.query

    let { name, subject, marks } = data;
    let filter={name,subject}
    let update={marks}

    let updatedStudent = await studentModel.findOneAndUpdate(filter,update, { new: true })

    return res.status(200).send({ message: "updated student data", data: updatedStudent })
}
//delete

exports.deleteStudentData = async function(req,res){

    let data = req.query
    let {name,subject}=data
    if(!data) return res.status(400).send({status:false, message:"enter name and subject to delete student"});

    let checkstudent=await studentModel.find({name: name, subject: subject} )
    if(!checkstudent) return res.status(404).send({status:false, message:"Data not found"})
    
    if(checkstudent.isDeleted=="true")
    return res.status(400).send({status:false, message:"Data already deleted"})

    let deleteStudent = await studentModel.findOneAndUpdate(data, {$set:{isDeleted:true}},{ new: true })
    return res.status(200).send({ message: "Delete student data", data: deleteStudent })

}