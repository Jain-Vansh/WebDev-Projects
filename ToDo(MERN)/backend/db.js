// mongo db database for the app
const mongoose = require("mongoose")

mongoose.connect("")

const data = new mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const Todo = mongoose.model("Todo",data)

module.exports = Todo