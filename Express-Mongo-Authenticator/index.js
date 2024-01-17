const {Admin} = require("./database.js")
const authenticateAdmin = require("./middleware.js")
const express = require("express")
const jwt = require("jsonwebtoken")
const jwtPassword = "hehe"

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
        const token = jwt.sign({
            username : username,
        },jwtPassword)

        await Admin.create({
            username : username,
            password : password,
            token : token
        })
        res.json({
            msg : "Admin Created Successfully"
        })
    }
    
})

app.get("/fetchAdmins",authenticateAdmin,async function(req,res){
    const response = await Admin.find()
    res.send(response)
})

app.post("/changePassword",authenticateAdmin,async function(req,res){
    const token = req.headers.authorization
    const newPassword = req.body.newPassword
        await Admin.updateOne({
            token : token
        },{
            password : newPassword
        })
        res.json({
            msg : "Password changed successfully"
        })
})

app.post("/deleteAdmin",authenticateAdmin,async function(req,res){
    const token = req.headers.authorization
    await Admin.deleteOne({
        token : token
    })
    res.json({
        msg : "Admin deleted successfully"
    })
})

app.listen(3000)