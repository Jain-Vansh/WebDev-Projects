const express = require("express")
const {createTodo, updateTodo} = require("./types")

const app = express()
app.use(express.json())

app.post("/todo", function(req,res){
    const todo = req.body
    const parse = createTodo.safeParse(todo)
    if(!parse.success){
        res.status(411).json({
            msg : "You sent wrong input"
        })
        return
    }   


})

app.get("/fetchTodo", function(req,res){

})

app.put("/done", function(req,res){
    const todo = req.body
    const parse = updateTodo.safeParse(todo)
    if(!parse.success){
        res.status(411).json({
            msg : "You sent wrong input"
        })
        return
    }


})

app.listen(3000)