const mongoose = require("mongoose")

mongoose.connect("")

const UserSchema = new mongoose.Schema({
    token : String,
    username : String,
    password : String,
    purchased : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Courses"
    }]
})

const AdminSchema = new mongoose.Schema({
    token : String,
    username : String,
    password : String
})

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number
})

const Admin = mongoose.model("Admin",AdminSchema)
const Users = mongoose.model("Users",UserSchema)
const Courses = mongoose.model("Courses",CourseSchema)

module.exports = {
    Admin,
    Users,
    Courses
}
