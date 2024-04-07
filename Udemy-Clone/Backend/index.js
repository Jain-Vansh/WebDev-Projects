const express = require("express")
const jwt = require("jsonwebtoken")
const {Users} = require("./database")

const secret = "ghf6758irf"
const app = express()
app.use(express.json())

app.post("/signUp",async function(req,res){
    const data = req.body
    const check = await Users.findOne({
        username : data.username
    })

    if(check){
        res.json({
            msg : "User Already Present!"
        })
    }
    else{
        token = jwt.sign({
            username : data.username,
            password : data.password
        },secret)

        await Users.create({
            token : token,
            username : data.username,
            password : data.password
        })
        res.json({
            msg : "User Created Successfully!"
        })
    }
    
})

app.listen(5000)