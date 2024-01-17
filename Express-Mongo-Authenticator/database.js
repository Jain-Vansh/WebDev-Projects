const mongoose = require("mongoose")
const { stringify } = require("querystring")

mongoose.connect("mongodb+srv://vansh:1234@cluster1.k821jap.mongodb.net/project")

const Admin = mongoose.model("Admin",{
    username : String,
    password : String
})

module.exports = Admin