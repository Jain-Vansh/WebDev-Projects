const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const {Users, Courses, Admin} = require("./database")
const {tokenCheckAdmin, tokenCheckUser} = require("./middleware")

const secret = "ghf6758irf"
const app = express()
app.use(express.json())
app.use(cors())

// Admin Routes
app.get("/users", async function(req,res){
    const result = await Users.find()
    if(result){
        res.status(200).json({
            msg : result
        })
    }
    else{
        res.status(400).json({
            msg : "ERROR"
        })
    }
    
})

app.post("/adminLogin", async function(req,res){
    const username = req.body.username
    const password = req.body.password
    const check = await Admin.findOne({
        username : username,
        password : password
    })

    if(check){
        res.status(200).json({
            msg : check.token
        })
    }
    else{
        res.status(401).json({
            msg : "Invalid Admin credentials"
        })
    }
})

app.post("/addCourse", tokenCheckAdmin, async function(req,res){
    const cid = req.body.cid
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    if(title == "" || description == "" || price == ""){
        res.status(400).json({
            msg : "ERROR! Empty Fields"
        })
    }
    else{
        await Courses.create({
            cid : cid,
            title : title,
            description : description,
            price : price
        })
        res.status(200).json({
            msg : "Course added"
        })
    }
})

app.delete("/removeCourse", async function(req,res){
    const cid = req.body.cid
    // const check = await Courses.findOne({
    //     _id : _id
    // })
    const check = await Courses.deleteOne({
        cid : cid
    })
    if(check){
        res.status(200).json({
            msg : "Course deleted"
        })
    }
    else{
        res.status(400).json({
            msg : "ERROR!"
        })
    }
    
})

// User Routes
app.post("/signUp",async function(req,res){
    const username = req.body.username
    const password = req.body.password
    const check = await Users.findOne({
        username : username
    })

    if(check){
        res.json({
            msg : "User Already Present!"
        })
    }
    else{
        token = jwt.sign({
            username : username,
            password : password
        },secret)

        await Users.create({
            token : token,
            username : username,
            password : password
        })
        res.json({
            msg : "User Created Successfully!"
        })
    }
    
})

app.post("/login", async function(req,res){
    const username = req.body.username
    const password = req.body.password
    const check = Users.findOne({
        username : username,
        password : password
    });

    if(check){
        res.status(200).json({
            msg : "Successfully logged in"
        })
    }
    else{
        res.status(401).json({
            msg : "Invalid credentials"
        })
    }
})

app.get("/home", async function(req,res){
    const data = await Courses.find()
    res.json({
        msg : data
    })
})

app.put("/buy", tokenCheckUser, async function(req,res){
    const title = req.body.title
    const auth = req.headers.authorization
    const result = await Courses.findOne({
        title : title
    })
    await Users.updateOne({
        token : auth
    },{
        purchased : result._id
    })
    res.status(200).json({
        msg : "Course Purchased Successfully"
    })
})

app.get("/myCourses", tokenCheckUser, async function(req,res){
    const auth = req.headers.authorization
    const result = await Users.find({
        token : auth
    })
    res.json({
        msg : result[0].purchased
    })
})
app.listen(4000)