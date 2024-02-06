const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const {profileDetails} = require("./database")
const secret = "zaws2ed3r4cfvgtby6u7"

const app = express()
app.use(express.json())
app.use(cors())

app.post("/signUp",async function(req,res){
    const details = req.body
    const check = await profileDetails.findOne({
        email : details.email
    })
    if(check){
        res.json({
            msg : "already present"
        })
    }
    else{
        const token = jwt.sign({
            email : details.email,
            password : details.password
        }, secret)
        profileDetails.create({
            email : details.email,
            password : details.password,
            token : token
        })
        res.json({
            msg : "success"
        })
    }
    
})

app.listen(3000)