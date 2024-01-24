const express = require("express")

const app = express()
app.use(express.json())

app.post("/todo", function(req,res){

})

app.get("/fetchTodo", function(req,res){

})

app.put("/done", function(req,res){
    
})

app.listen(3000)