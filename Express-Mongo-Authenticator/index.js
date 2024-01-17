const {Admin} = require("./database.js")
const express = require("express")

const app = express()
app.use(express.json())

app.post("/signup",function(req,res){
    const username = req.body.username
    const password = req.body.password
    Admin.create({
        username : username,
        password : password
    }).then(function(){
        res.json({
            msg : "Admin Created Successfully"
        })
    })
})

app.listen(3000)