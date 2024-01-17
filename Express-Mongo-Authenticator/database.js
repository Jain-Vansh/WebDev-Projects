const mongoose = require("mongoose")
const { stringify } = require("querystring")

mongoose.connect("mongodb+srv://vansh:1234@cluster1.k821jap.mongodb.net/project")

const adminSchema = new mongoose.Schema({
    username : String,
    password : String,
    token : String
})

const Admin = mongoose.model("Admin", adminSchema)

module.exports = {Admin}