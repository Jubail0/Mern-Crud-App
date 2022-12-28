const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
app.use(express.json())
const User = require("./model/userSchema.js")
const dotenv = require('dotenv')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({path:'../backend/config.env'})
// Database Connection 

const DB  = process.env.DATABASE
mongoose.connect(DB).then(()=> console.log("Connection Successful")).catch(error => console.log("No Connection"))

// Database Connection 


app.get("/getdata", async (req,res)=>{
    try {
        const foundUser = await User.find()
        
        if(!foundUser){
            return res.status(422).json({err:"User not found, Please add new user.."}) 
        }else{
            return res.status(201).send(foundUser)
            
        }


    } catch (error) {
        console.log(error)
    }
})


app.post("/user", async (req,res)=>{
    const{name,work,contact}=req.body
    

    if(!name || !work || !contact){
        return res.status(422).json({err:"Please fill the informations!"})
    }
    try {
      const users = await new User({name,work,contact})  
      const added = users.save()

      if(!added ){
        return res.status(422).json({err:"Fail to add user"})
      }else{
        return res.status(201).json({message:"User added successfully."})
      }
      
        
    } catch (error) {
        console.log(error)
    }
})
app.get("/view/:id", async (req,res)=>{
    try {
    const {id}=req.params
    console.log(id)
    const foundUser = await User.findById({_id:id})
    if(!foundUser){
    return res.status(422).json({err:"User details not available!"})

    }else{
     res.status(201).send(foundUser)
    }
} catch (error) {
        
}
})

app.get("/user/:id", async (req,res)=>{
    try {
    const {id}=req.params
    
    const foundUser = await User.findById({_id:id})
    if(!foundUser){
    return res.status(422).json({err:"User details not available!"})

    }else{
     res.status(201).send(foundUser)
    }
} catch (error) {
        
}
})

app.patch("/user/:id", async (req,res)=>{
    try {
    const {id}=req.params
    
    const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true})
    if(!updateUser){
    return res.status(422).json({err:"fail to update"})

    }else{
     res.status(201).send(updateUser)
    }
} catch (error) {
    console.log(error)
}
})

app.delete("/delete/:id", async (req,res)=>{
    try {
    const {id}=req.params
    
    const deleteUser = await User.findByIdAndDelete({_id:id})
   if(!deleteUser){
    res.status(422).json({err:"Failed to delete"})
   }else{
    res.status(201).send(deleteUser)
   }
     
    
} catch (error) {
        console.log(error)
}
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`)
})