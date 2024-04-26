const express = require("express")
const jwt = require("jsonwebtoken")
const {Users, Courses, Admin} = require("./database")

const secret = "ghf6758irf"
const app = express()
app.use(express.json())

// Admin Routes
app.get("/users", async function(req,res){
    const result = await Users.find()
    res.json({
        msg : result
    })
})

app.post("/adminLogin", async function(req,res){
    const data = req.body
    const check = await Admin.findOne({
        username : data.username,
        password : data.password
    })

    if(check){
        res.json({
            msg : "Admin log in successful"
        })
    }
    else{
        res.json({
            msg : "Invalid Admin credentials"
        })
    }
})

app.post("/addCourse", async function(req,res){
    const data = req.body
    await Courses.create({
        title : data.title,
        description : data.description,
        price : data.price
    })
    res.json({
        msg : "Course added"
    })
})

app.delete("/removeCourse", async function(req,res){
    const data = req.body
    await Courses.deleteOne({
        title : data.title
    })
    res.json({
        msg : "Course deleted"
    })
})

// User Routes
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

app.post("/login", async function(req,res){
    const data = req.body
    const check = Users.findOne({
        username : data.username,
        password : data.password
    });

    if(check){
        res.json({
            msg : "Successfully logged in"
        })
    }
    else{
        res.json({
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

app.put("/buy", async function(req,res){
    const data = req.body
    const auth = req.headers.authorization
    const result = await Courses.findOne({
        title : data.title
    })
    await Users.updateOne({
        token : auth
    },{
        purchased : result._id
    })
    res.json({
        msg : "Course Purchased Successfully"
    })
})

app.get("/myCourses", async function(req,res){
    const auth = req.headers.authorization
    const result = await Users.find({
        token : auth
    })
    res.json({
        msg : result[0].purchased
    })
})
app.listen(4000)