const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://vansh:1234@cluster1.k821jap.mongodb.net/Profiles")

const userSchema = new mongoose.Schema({
    token : String,
    email : String,
    password : String,
    firstName : String,
    lastName : String,
    age : Number,
    gender : String,
    location : String,
    mobileNumber : Number,
    bio : String,
    expertise : String
})

const profileDetails = mongoose.model("Profiles",userSchema)

module.exports = {profileDetails}