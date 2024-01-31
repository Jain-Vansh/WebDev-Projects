const mongoose = require("mongoose")

mongoose.connect("")

const userSchema = new mongoose.Schema({
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