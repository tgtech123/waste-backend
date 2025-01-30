const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require("bcrypt")
const cors = require("cors")
const requestRoute = require('./routes/requestRoute')
const locationRoute = require('./routes/locationRoute')


const app = express()
// database uri
const uri = "mongodb+srv://admin:admin@emmanuel.q96slry.mongodb.net/teegee?retryWrites=true&w=majority"
 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use("/request", requestRoute)
app.use("/location", locationRoute)



 
app.get("/", (req, res) => {  
    res.send("hello world")
})
//register new user route
app.post("/register", async(req, res) =>{
    try {
        const  {name, phone, dob, password, email } = req.body

        const emailexist = await User.findOne({email})
 

   // checking if email already exist
     if(!emailexist) { 
         //password hashing
         const saltRound = 10
         const hashedPassword = await bcrypt.hash(password, saltRound)
     
         //creating new user
         await User.create({
             name, phone, dob, password: hashedPassword, email 
         })
    
         return res.status(201).json({message: 'User created successfully'});
         
    } else {
        return res.status(409).json({message: 'email already exists'})
    } 
   
    } catch (error) { 
       console.log(error) 
    }
}) 

app.get("/register", async(req, res) => {
    const display = await User.find()
    res.send({display})
})

app.get("/userdetails/:email", async(req, res) => {
    const userEmail = req.params.email

    const userDetails = await User.findOne({email: userEmail})

    res.send({userDetails})
})


// route for log in
app.post('/login', async(req, res)=> {
    try {
        const {email, password} = req.body

        if(email === "" || password === ""){
          return  res.status(404).json({message: "email or pasword cannot be empty"})
        } else {

        }
        const getUser = await User.findOne({email})

        if(!getUser){
          return  res.status(404).json({message: "email does not exist"})
        }

        const passwordMatch = await bcrypt.compare(password, getUser.password)

        if(passwordMatch){

          return  res.json({message: "successfully logged in"})
        } {
          return  res.status(200).json({message: "incorrect password"})
        }
 
 
    } catch (error) {
       return res.status(400).json({message: "error occurred"}) 
    }  
})



mongoose.connect(uri)
.then(() =>{
    console.log("connected to database")

    app.listen(8989, ()=>{
        console.log("server running at port 8989")
    })
}).catch((error) =>{
    console.log(error)
})
