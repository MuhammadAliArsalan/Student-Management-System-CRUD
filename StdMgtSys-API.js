const express=require("express");
const mongoose = require('mongoose');
const Student = require("./models/student.model.js");
const app=express();

app.use(express.json());    //middleware

app.get('/',(req,res)=>{
    res.send("The Student management system API which i created on 31st august");
})

app.get('/api/student/:id',async(req,res)=>{        //find a specifc record by id
  try{
    const{id}=req.params;

    const student=await Student.findById(id);
    res.status(200).json(student);

  }
  catch(error){
    res.status(500).json({ message: error.message });

  }
})

app.post('/api/student',async(req,res)=>{         //create a new record in database
    
    try {
        // Extracting student data from the request body
        const { name, rollNo, department, yearOfStudy, contact } = req.body;
        // Creating a new student record 
        const student = await Student.create({
          name,
          rollNo,
          department,
          yearOfStudy,
          contact
        });
    
        res.status(200).json(student);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

app.get('/api/students',async(req,res)=>{      // find all students
    try{
    const students=await Student.find({});
    res.status(200).json(students);}

    catch (error) {
        res.status(500).json({ message: error.message });
      }
})

app.put('/api/student/:id',async(req,res)=>{      //update a student record
  try{
    const{id}=req.params;
    const student=await Student.findByIdAndUpdate(id,req.body);

    if(!Student){
      return res.status(404).json({message:"Student record not found"});
    }
    res.status(200).json(student);

  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
})

app.delete('/api/student/:id',async(req,res)=>{
  try{
    const{id}=req.params;
    const student=await Student.findByIdAndDelete(id);

    if(!Student){
      return res.status(404).json({message:"Student record not found"})
    }
    res.status(200).json({message:"Student record deleted "})
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
})

mongoose.connect("mongodb+srv://arsalanali:aliNED2022@stdmgtsysapi.pa2xe.mongodb.net/StudentMgtSystem-API?retryWrites=true&w=majority&appName=StdMgtSysAPI")
.then(()=>{
    console.log("Connected to database");
    app.listen(3000,()=>{
        console.log("the server is running on port 3000")
    })
})
.catch(()=>{
    console.log("Connection failed");
})
