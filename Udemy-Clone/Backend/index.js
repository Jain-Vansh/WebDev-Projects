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
    res.json({
        msg : result
    })
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
            msg : "Admin log in successful"
        })
    }
    else{
        res.status(401).json({
            msg : "Invalid Admin credentials"
        })
    }
})

app.post("/addCourse", tokenCheckAdmin, async function(req,res){
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    await Courses.create({
        title : title,
        description : description,
        price : price
    })
    res.json({
        msg : "Course added"
    })
})

app.delete("/removeCourse", tokenCheckAdmin, async function(req,res){
    const title = req.body.title
    await Courses.deleteOne({
        title : title
    })
    res.json({
        msg : "Course deleted"
    })
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

app.get("/home", tokenCheckUser, async function(req,res){
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