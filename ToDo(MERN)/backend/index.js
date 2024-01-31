const express = require("express")
const cors = require("cors")
const {createTodo, updateTodo} = require("./types")
const {Todo} = require("./db.js")

const app = express()
app.use(express.json())
app.use(cors())

app.post("/todo", async function(req,res){
    const todo = req.body
    const parse = createTodo.safeParse(todo)
    if(!parse.success){
        res.status(411).json({
            msg : "You sent wrong input"
        })
        return
    }   

    await Todo.create({
        title : todo.title,
        description : todo.description,
        completed : false
    })

    res.json({
        msg : "Todo created"
    })


})

app.get("/fetchTodo", async function(req,res){
    const getTodo = await Todo.find({})
    res.json({
        getTodo
    })

})

app.put("/done", async function(req,res){
    const todo = req.body
    const parse = updateTodo.safeParse(todo)
    if(!parse.success){
        res.status(411).json({
            msg : "You sent wrong input"
        })
        return
    }

    await Todo.updateOne({
        _id : req.body.id
    },{
        completed : true
    })

    res.json({
        msg : "Todo completed"
    })


})

app.listen(3000)