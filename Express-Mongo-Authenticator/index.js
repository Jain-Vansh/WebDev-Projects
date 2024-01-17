const {Admin} = require("./database.js")
const express = require("express")

const app = express()
app.use(express.json())

app.post("/signup",async function(req,res){
    const username = req.body.username
    const password = req.body.password
    const check = await Admin.findOne({
        username : username,
        password : password
    })
    if(check){
        res.json({
            msg : "User already present"
        })
    }
    else{
        await Admin.create({
            username : username,
            password : password
        })
        res.json({
            msg : "Admin Created Successfully"
        })
    }
    
    
})

app.listen(3000)