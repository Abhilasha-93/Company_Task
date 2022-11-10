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
    if(!marks ||typeof marks !=='number' || marks.length==0 )
    {
        return res.status(400).send({ status: false, msg: "marks required and is of number type" })
    }

    //validate marks
    // if (!/^([0-9]{3})$/.test(marks)) {
    //     return res.status(400).send({ status: false, message: "marks contain only number" })
    // }

 
    let studentData = await studentModel.find({ name: name});
    console.log(studentData)
    
    if (studentData.length==0) {

        let createStudentData = await studentModel.create(data);
       
        return res.status(201).send({ message: "student data created", data: createStudentData })

    } else {
    
        let updatedStudentData = await studentModel.findOneAndUpdate({name:name,subject:subject},{$inc:{marks : marks}}, { new: true })
        return res.status(200).send({ message: "student data updated", data: updatedStudentData })

    }

}
/////////////////////
// const getBook = async function (req, res) {
//     try {
//         const data = req.query;

//         // if (!isValidRequestBody(data)) return res.status(400).send({
//         //     status: false, message: "Invalid request parameters. Please provide book details"
//         // })

//         let obj = { isDeleted: false }

//         let { userId, category, subcategory } = data;

//         if (userId) {
//             if (!isValidObjectId(userId)) {
//                 return res.status(400).send({ status: false, msg: "userId is not valid author id please check it" })
//             }
//         }
//         if (isValid(userId)) {
//             let user = await bookModel.find({ userId: userId });
//             if (user.length == 0) {
//                 res.status(400).send({ status: false, msg: "no data found with this user id " })
//                 return;
//             }
//             obj.userId = userId
//         }

//         if (isValid(category)) {
//             let cat = await bookModel.find({ category: category });
//             if (cat.length == 0) {
//                 res.status(400).send({ status: false, msg: "category is not matching with any blog category" })
//                 return;
//             }
//             obj.category = category
//         }

//         if (isValid(subcategory)) {
//             let subcat = await bookModel.find({ subcategory: subcategory });
//             if (subcat.length == 0) {
//                 res.status(400).send({ status: false, msg: "subcategory is not matching with any one of blog subcategory" })
//                 return;
//             }
//             obj.subcategory = subcategory
//         }

//         let findBook = await bookModel.find(obj).select({ title: 1, category: 1, excerpt: 1, userId: 1, reviews: 1, releasedAt: 1 }).sort({ title: 1 })
//         if (findBook.length == 0) {
//             return res.status(404).send({ status: false, message: "No such book found" })
//         }
//         res.status(200).send({ status: true, message: 'Books list', data: findBook })

//     }
//     catch (err) { return res.status(500).send({ message: "Error", error: err.message }) }



//////////////////////
//view
exports.getStudent = async function (req, res) {
    let data = req.query
    //validation
    let obj = { isDeleted: false }

    let {name, subject} = data;
  
    if(!data) 
    return res.status(400).send({ message: "enter name and subject"})

   if(name){
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
     obj.name=name
   } 
     //check subject is present 
   if(subject){
     if(!subject ||typeof subject !=='string' || subject.trim().length==0 )
     {
         return res.status(400).send({ status: false, msg: "subject is required and is of string type" })
     }
    

     //validate subject
     if (!/^([a-zA-Z. , ]){1,100}$/.test(name)) {
         return res.status(400).send({ status: false, message: `subject contain only alphabets` })
     }obj.subject=subject
    }

    let studentData = await studentModel.find(obj);
    if (studentData.length==0) {
        return res.status(404).send({ message: "student data not found" })
    }

    return res.status(200).send({ message: "student data", data: studentData })

}

// edit

exports.updateStudentData = async function (req, res) {
    
  try  {
    let data = req.query
 
   if( Object.keys(data).length == 0)
    return res.status(400).send({ message: "enter data to edit"})
    let { _id,name, subject, marks } = data;
    // let filter={name,subject}
    // let update={marks}
    let obj = await studentModel.findOne({ _id: _id })
  // let obj={isDeleted:false}
   if(name){
    obj.name=name
   }
   if(subject){
    obj.subject=subject
   }
   if(marks){
    obj.marks=marks
   }
   
   // let updatedStudent = await studentModel.findOneAndUpdate({_id:_id},{obj}, { new: true }).save
    await obj.save()

    return res.status(200).send({ message: "updated student data", data: obj })
}
catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}
//delete

exports.deleteStudentData = async function(req,res){

    let data = req.query
    let {name,subject}=data
    if(!data) return res.status(400).send({status:false, message:"enter name and subject to delete student"});

    let checkstudent=await studentModel.find({name: name, subject: subject, isDeleted:false} )
    if(checkstudent.length==0) return res.status(404).send({status:false, message:"Data not found"})

    let deleteStudent = await studentModel.findOneAndUpdate(data, {$set:{isDeleted:true}},{ new: true })
    return res.status(200).send({ message: "Delete student data", data: deleteStudent })

}