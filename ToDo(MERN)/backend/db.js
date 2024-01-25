// mongo db database for the app
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://vansh:1234@cluster1.k821jap.mongodb.net/Todo")

const data = new mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const Todo = mongoose.model("Todo",data)

module.exports = {Todo}